import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

const updateUserValidationSchema = z.object({
  name: z.string({ message: 'Name is required' }).optional(),
  phone: z.string({ message: 'Phone is required' }).optional(),
  photo: z.string().url({ message: 'Invalid photo URL' }).optional(),
  role: z.enum(['admin', 'user']).optional(),
  status: z.enum(['active', 'inactive']).optional(),
  is_deleted: z.boolean().optional(),
});

const updateUserValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = updateUserValidationSchema.parse(req.body);
    next();
  } catch (error) {
    const result = updateUserValidationSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type UpdateUserInput = z.infer<typeof updateUserValidationSchema>;
export { updateUserValidation };
