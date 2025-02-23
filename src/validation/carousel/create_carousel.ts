import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

const createCarouselValidationSchema = z.object({
  image: z.string({ message: 'Image link is required' }).url({ message: 'Invalid image URL' }),
});

const createCarouselValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = createCarouselValidationSchema.parse(req.body);
    next();
  } catch (error) {
    const result = createCarouselValidationSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type CreateCarouselInput = z.infer<typeof createCarouselValidationSchema>;
export { createCarouselValidation };
