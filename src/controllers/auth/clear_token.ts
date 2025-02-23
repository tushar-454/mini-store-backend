import { NextFunction, Request, Response } from 'express';

const clearToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 0,
      })
      .status(200)
      .json({
        success: true,
      });
  } catch (error) {
    next(error);
  }
};

export { clearToken };
