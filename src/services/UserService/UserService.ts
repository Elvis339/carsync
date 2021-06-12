import bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { User } from "../../entity/User";
import { BadRequestError } from "../../errors";

interface UserService {
  createUser: ({ email, password }: Pick<User, "email" | "password">) => Promise<User>;
  exists: (email: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<User | null>;
  changePassword: (id: number, oldPassword: string, newPassword: string) => Promise<boolean>;
}

/**
 * Deals with its entity & provides utility functions for the controller
 * @param userRepository
 * @constructor
 */
const UserService = (userRepository: Repository<User>): UserService => {
  const createUser = async ({ email, password }: Pick<User, "email" | "password">): Promise<User> => {
    if (await exists(email)) {
      throw new BadRequestError();
    }

    return await userRepository.save(new User(email, password));
  };

  const exists = async (email: string): Promise<boolean> => {
    const user = await userRepository.findOne({ email });

    return !!user;
  };

  const login = async (email: string, password: string): Promise<User | null> => {
    const user = await userRepository.findOne({ email });

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return user;
    }

    return null;
  };

  const changePassword = async (id: number, oldPassword: string, newPassword: string): Promise<boolean> => {
    const user = await userRepository.findOne({ id });

    if (!user) {
      return false;
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (isMatch) {
      await userRepository.update({ id: user.id }, { password: await bcrypt.hash(newPassword, 10) });
      return true;
    }
    return false;
  };

  return {
    createUser,
    exists,
    login,
    changePassword,
  };
};

export default UserService;
