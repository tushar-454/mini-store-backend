import { IUser, User } from '../../models/User';

const getUsersService = async (): Promise<IUser[] | undefined> => {
  try {
    const users = await User.find().select({
      password: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    return users || [];
  } catch (error) {
    console.log('Error in getUsersService', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { getUsersService };
