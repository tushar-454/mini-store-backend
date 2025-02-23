import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

const createGalleryValidationSchema = z.object({
  src: z.string({ message: 'src is required' }).url({ message: 'src must be a valid URL' }),
  width: z.number({ message: 'width is required' }).positive(),
  height: z.number({ message: 'height is required' }).positive(),
  label: z.string({ message: 'label is required' }),
});

const createGalleryValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = createGalleryValidationSchema.parse(req.body);
    next();
  } catch (error) {
    const result = createGalleryValidationSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type CreateGalleryInput = z.infer<typeof createGalleryValidationSchema>;
export { createGalleryValidation };
