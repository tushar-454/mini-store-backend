import { NextFunction, Request, Response } from 'express';
import { findUserByProperty } from '../../services/user/find_user_by_property';

const getUserData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const email = req.params.email;
    const user = await findUserByProperty('email', email);
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export { getUserData };
