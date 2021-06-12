import jwt from "jsonwebtoken";

interface SignTokenPayload {
  id: number;
  email: string;
}

export interface TokenPayload {
  id: number;
  sub: string;
  created_at: Date;
  expires_at: Date;
}

interface JwtService {
  signRegisterToken: ({ email, id }: SignTokenPayload) => string;
}

const JwtService = (): JwtService => {
  const signRegisterToken = ({ email, id }: SignTokenPayload): string => {
    return jwt.sign(
      {
        id,
        sub: email,
        aud: "local",
      },
      process.env.SECRET,
      {
        expiresIn: process.env.EXPIRES_IN,
      },
    );
  };

  return {
    signRegisterToken,
  };
};

export default JwtService;
