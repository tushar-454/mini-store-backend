import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

const updateReviewValidationSchema = z.object({
  is_deleted: z.boolean().optional(),
});

const updateReviewValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = updateReviewValidationSchema.parse(req.body);
    next();
  } catch (error) {
    const result = updateReviewValidationSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type UpdateReviewInput = z.infer<typeof updateReviewValidationSchema>;
export { updateReviewValidation };
