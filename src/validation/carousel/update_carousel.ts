import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

const updateCarouselValidationSchema = z.object({
  image: z.string({ message: 'Image link is required' }).url({ message: 'Invalid image URL' }).optional(),
});

const updateCarouselValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = updateCarouselValidationSchema.parse(req.body);
    next();
  } catch (error) {
    const result = updateCarouselValidationSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type UpdateCarouselInput = z.infer<typeof updateCarouselValidationSchema>;
export { updateCarouselValidation };
