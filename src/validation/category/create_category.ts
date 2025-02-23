import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

const createCategoryValidationSchema = z.object({
  name: z.string({ message: 'Name is required' }),
  photo: z.string({ message: 'Photo link is required' }).url({ message: 'Invalid photo URL' }),
});

const createCategoryValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = createCategoryValidationSchema.parse(req.body);
    next();
  } catch (error) {
    const result = createCategoryValidationSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type CreateCategoryInput = z.infer<typeof createCategoryValidationSchema>;
export { createCategoryValidation };
