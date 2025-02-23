import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

export interface RequestWithUser extends Request {
  email?: string;
  user?: IUser;
}

const verifyToken = (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> | undefined => {
  const token = req.cookies.token;

  if (!token) {
    res.status(403).json({
      success: false,
      error: 'unauthorized',
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (typeof decoded !== 'string' && 'email' in decoded) {
      req.email = decoded.email;
      next();
    }
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
