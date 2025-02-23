import { IUser, User } from '../../models/User';
import { CreateUserInput } from '../../validation/auth/create_user';

const createUserService = async (user: CreateUserInput): Promise<IUser | undefined> => {
  const { name, email, photo } = user;
  try {
    const new_user = await User.create({ name, email, photo });
    await new_user.save();
    return new_user;
  } catch (error) {
    console.error('Error creating user:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { createUserService };
