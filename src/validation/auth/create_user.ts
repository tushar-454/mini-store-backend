import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

const createUserValidationSchema = z.object({
  name: z.string({ message: 'Name is required' }),
  email: z.string({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
  photo: z.string().url({ message: 'Invalid photo URL' }).optional(),
});

const createUserValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = createUserValidationSchema.parse(req.body);
    next();
  } catch (error) {
    const result = createUserValidationSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type CreateUserInput = z.infer<typeof createUserValidationSchema>;
export { createUserValidation };
