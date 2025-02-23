import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

const updateGalleryValidationSchema = z.object({
  src: z.string({ message: 'src is required' }).url({ message: 'src must be a valid URL' }).optional(),
  width: z.number({ message: 'width is required' }).positive().optional(),
  height: z.number({ message: 'height is required' }).positive().optional(),
  label: z.string({ message: 'label is required' }).optional(),
});

const updateGalleryValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = updateGalleryValidationSchema.parse(req.body);
    next();
  } catch (error) {
    const result = updateGalleryValidationSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type UpdateGalleryInput = z.infer<typeof updateGalleryValidationSchema>;
export { updateGalleryValidation };
