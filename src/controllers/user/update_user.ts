import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../../middlewares/verify_token';
import { findUserByProperty } from '../../services/user/find_user_by_property';
import { UpdateUserInput } from '../../validation/user/update_user';

const updateUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params;
    const { name, phone, photo, role, status, is_deleted } = req.body as UpdateUserInput;

    const user = await findUserByProperty('_id', userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }
    user.name = name ?? user.name;
    user.phone = phone ?? user.phone;
    user.photo = photo ?? user.photo;
    user.role = role ?? user.role;
    user.status = status ?? user.status;
    user.is_deleted = is_deleted ?? user.is_deleted;
    await user.save();
    res.status(200).json({
      success: true,
      message: 'Resource updated',
    });
  } catch (error) {
    next(error);
  }
};

export { updateUser };
