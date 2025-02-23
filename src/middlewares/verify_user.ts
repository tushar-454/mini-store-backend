import { NextFunction, Response } from 'express';
import { findUserByProperty } from '../services/user/find_user_by_property';
import { RequestWithUser } from './verify_token';

const verifyUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
  try {
    const email = req.email!;
    const user = await findUserByProperty('email', email);
    if (!user) {
      res.status(403).json({
        success: false,
        error: 'unauthorized',
      });
      return;
    }
    if (user.role !== 'user') {
      res.status(403).json({
        success: false,
        error: 'forbidden',
      });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyUser;
