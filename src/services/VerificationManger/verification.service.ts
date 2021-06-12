import { Secret, User } from "../../types";
import { addFiveMinutesToDate, hasFiveMinutesPassed } from "../../utils/dateUtils";

type VerificationUser = Pick<User, "email" | "password">;

interface VerificationServiceManager {
  getUser: () => VerificationUser;
  setUser: (newUser: VerificationUser) => void;
  getSecret: () => Secret;
  setSecret: (newSecretCode: string) => void;
  isSecretValid: () => boolean;
  clear: () => void;
}

const VerificationServiceManager = (): VerificationServiceManager => {
  let user: VerificationUser;
  let secret: Secret;

  const getUser = (): VerificationUser => {
    return user;
  };

  const setUser = (newUser: VerificationUser): void => {
    user = newUser;
  };

  const getSecret = (): Secret => {
    return secret;
  };

  const setSecret = (code: string) => {
    secret = {
      code,
      expiresIn: addFiveMinutesToDate(),
    };
  };

  const isSecretValid = (): boolean => {
    if (!secret || !secret.expiresIn) {
      return false;
    }
    return !hasFiveMinutesPassed(secret.expiresIn);
  };

  const clear = (): void => {
    user = null;
    secret = null;
  };

  return {
    getUser,
    setUser,
    getSecret,
    setSecret,
    isSecretValid,
    clear,
  };
};

export default VerificationServiceManager;
