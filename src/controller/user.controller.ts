import { Request, Response } from "express";
import crypto from "crypto";
import { getRepository } from "typeorm";

import {
  jwtService,
  loggerService,
  mailService,
  userService,
  verificationService,
  viewTemplateService,
} from "../services";
import { User } from "../entity/User";
import { BadRequestError, SecretCodeError, SecretCodeExpiredError } from "../errors";

// Not so functional to have "global" variable like this, but sometimes we need a instance level variable
const verificationManager = verificationService();

const register = async (request: Request, response: Response): Promise<void> => {
  const { email, password } = request.body;
  const exists = await userService(getRepository(User)).exists(email);
  const code = crypto.randomBytes(3).toString("hex");

  if (exists) {
    throw new BadRequestError("User already exists!");
  }

  verificationManager.setUser({ email, password });
  verificationManager.setSecret(code);

  const view = viewTemplateService();
  const emailTemplate = await view.getEmailTemplate("register", {
    email,
    code,
    iat: new Date().toString(),
    eat: verificationManager.getSecret().expiresIn,
  });

  const mail = mailService();
  await mail.sendMessage({
    to: email,
    subject: "Security code",
    html: emailTemplate,
  });
  loggerService.info(`Email with security code is sent.`);

  // send to email address a code
  response.json({
    code,
  });
};

const verify = async (request: Request, response: Response): Promise<void> => {
  const { code } = request.params;

  if (!code) {
    throw new SecretCodeError("Secret code is not provided or invalid");
  }

  if (!verificationManager.isSecretValid()) {
    throw new SecretCodeExpiredError();
  }

  const user = await userService(getRepository(User)).createUser({
    email: verificationManager.getUser().email,
    password: verificationManager.getUser().password,
  });
  verificationManager.clear();
  const token = jwtService().signRegisterToken({ email: user.email, id: user.id });
  loggerService.info(`Code and user are valid!`);

  response.json({
    token,
  });
};

const login = async (request: Request, response: Response): Promise<void> => {
  const { email, password } = request.body;

  const userServiceManager = userService(getRepository(User));
  const user: User | null = await userServiceManager.login(email, password);

  if (!user) {
    throw new BadRequestError("Email or Password is invalid.");
  }

  const token = jwtService().signRegisterToken({ email: user.email, id: user.id });

  response.json({
    token,
  });
};

const changePassword = async (request: Request, response: Response): Promise<void> => {
  const { currentPassword, newPassword } = request.body;
  const loggedUser = request.user as User;

  if (!currentPassword || !newPassword) {
    throw new BadRequestError();
  }

  const userServiceManager = userService(getRepository(User));
  const user = await userServiceManager.changePassword(loggedUser.id, currentPassword, newPassword);

  if (!user) {
    throw new BadRequestError();
  }

  response.json({ ...loggedUser });
};

export { register, login, verify, changePassword };
