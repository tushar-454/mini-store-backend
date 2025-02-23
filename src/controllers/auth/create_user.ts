import { NextFunction, Request, Response } from 'express';
import { createUserService } from '../../services/user/create_user';
import { findUserByProperty } from '../../services/user/find_user_by_property';
import { CreateUserInput } from '../../validation/auth/create_user';

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, photo } = req.body as CreateUserInput;
    const existing_user = await findUserByProperty('email', email);
    if (existing_user) {
      res.status(409).json({
        success: false,
        message: 'User already exists',
      });
      return;
    }
    const new_user = await createUserService({ name, email, photo });
    const user = new_user?.toObject();
    delete user.password;
    delete user.is_deleted;
    delete user.createdAt;
    delete user.updatedAt;
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    next(error);
  }
};

export { createUser };
