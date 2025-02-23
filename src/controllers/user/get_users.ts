import { NextFunction, Request, Response } from 'express';
import { getUsersService } from '../../services/user/get_users';

const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await getUsersService();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export { getUsers };
