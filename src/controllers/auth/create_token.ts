import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const createToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({
        success: false,
        error: 'Email is required',
      });
      return;
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: process.env.COOKIE_EXPIRES_IN ? parseInt(process.env.COOKIE_EXPIRES_IN, 10) : 0,
      })
      .status(200)
      .json({
        success: true,
      });
  } catch (error) {
    next(error);
  }
};

export { createToken };
