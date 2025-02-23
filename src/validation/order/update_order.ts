import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

const updateOrderValidationSchema = z.object({
  status: z.string().optional(),
  is_deleted: z.boolean().optional(),
});

const updateOrderValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = updateOrderValidationSchema.parse(req.body);
    next();
  } catch (error) {
    const result = updateOrderValidationSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type UpdateOrderInput = z.infer<typeof updateOrderValidationSchema>;
export { updateOrderValidation };
