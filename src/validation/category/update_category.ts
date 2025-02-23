import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

const updateCategoryValidationSchema = z.object({
  name: z.string({ message: 'Name is required' }),
  photo: z.string({ message: 'Photo link is required' }).url({ message: 'Invalid photo URL' }),
});

const updateCategoryValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = updateCategoryValidationSchema.parse(req.body);
    next();
  } catch (error) {
    const result = updateCategoryValidationSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type UpdateCategoryInput = z.infer<typeof updateCategoryValidationSchema>;
export { updateCategoryValidation };
