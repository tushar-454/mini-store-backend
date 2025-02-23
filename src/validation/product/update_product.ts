import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

const updateProductValidationSchema = z.object({
  name: z.string().nonempty().optional(),
  description: z.string().nonempty().optional(),
  price: z.number().positive().optional(),
  discount: z.number().int().min(0).max(100).optional().optional(),
  stock: z.number().int().min(0).optional().optional(),
  images: z.array(z.string().url()).nonempty().optional(),
  is_featured: z.boolean().optional().optional(),
  is_upcoming: z.boolean().optional().optional(),
  is_deleted: z.boolean().optional().optional(),
  sell_count: z.number().int().min(0).optional(),
  rating: z.number().min(0).max(5).optional(),
  category: z.string().nonempty().optional(),
  variants: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string().nonempty(),
        price: z.number().positive(),
      })
    )
    .optional(),
  status: z.enum(['active', 'inactive', 'stock out']).optional(),
});

const updateProductValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = updateProductValidationSchema.parse(req.body);
    next();
  } catch (error) {
    const result = updateProductValidationSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type UpdateProductInput = z.infer<typeof updateProductValidationSchema>;
export { updateProductValidation };
