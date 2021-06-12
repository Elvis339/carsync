import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { BadRequestError } from "../errors";

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3),
});

export const userValidationMiddleware = async (
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> => {
  const { email, password } = request.body;
  const { error } = registerSchema.validate({ email, password });

  if (error) {
    next(new BadRequestError(error.message));
  }

  return next();
};
