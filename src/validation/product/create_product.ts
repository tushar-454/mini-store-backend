import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

const createProductValidationSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  price: z.number().positive(),
  discount: z.number().nonnegative(),
  images: z.array(z.string().url()).nonempty(),
  category: z.string().nonempty(),
  variants: z
    .array(
      z.object({
        name: z.string().nonempty(),
        price: z.number().positive(),
      })
    )
    .nonempty(),
});

const createProductValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = createProductValidationSchema.parse(req.body);
    next();
  } catch (error) {
    const result = createProductValidationSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type CreateProductInput = z.infer<typeof createProductValidationSchema>;
export { createProductValidation };
