import passportJWT from "passport-jwt";
import { User } from "../../entity/User";
import { getRepository } from "typeorm";
import { TokenPayload } from "../JwtService/jwt.service";

const JWTStrategy = passportJWT.Strategy;

interface AuthService {
  applyPassport: (passport) => void;
}

const AuthService = (): AuthService => {
  const applyPassport = passport => {
    passport.use(
      new JWTStrategy(
        {
          jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.SECRET,
        },
        (payload: TokenPayload, done) => {
          const userRepository = getRepository(User);
          return userRepository
            .findOne({ email: payload.sub })
            .then(user => {
              if (user) {
                return done(null, {
                  id: user.id,
                  email: user.email,
                });
              }
            })
            .catch(error => done(error, false));
        },
      ),
    );
  };

  return {
    applyPassport,
  };
};

export default AuthService;
