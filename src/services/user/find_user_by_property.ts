import { IUser, User } from '../../models/User';

const findUserByProperty = async (property: string, value: string): Promise<IUser | undefined> => {
  try {
    const user = await User.findOne({
      [property]: value,
    });
    return user || undefined;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    console.error('Error finding user by property:', error);
  }
};

export { findUserByProperty };
