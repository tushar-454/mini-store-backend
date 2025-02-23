import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

const createReviewValidationSchema = z.object({
  comment: z
    .string()
    .nonempty({
      message: 'Comment is required',
    })
    .max(200, {
      message: 'Comment should not exceed 200 characters',
    }),
});

const createReviewValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = createReviewValidationSchema.parse(req.body);
    next();
  } catch (error) {
    const result = createReviewValidationSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type CreateReviewInput = z.infer<typeof createReviewValidationSchema>;
export { createReviewValidation };
