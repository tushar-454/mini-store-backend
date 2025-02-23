import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

const createOrderValidationSchema = z.object({
  name: z.string({
    message: 'Name is required',
  }),
  email: z.string().email({
    message: 'Invalid email address',
  }),
  phone: z.string({
    message: 'Phone is required',
  }),
  line_items: z.array(
    z.object({
      product_id: z.string(),
      name: z.string(),
      image: z.string().url({
        message: 'Invalid image URL',
      }),
      quantity: z.number(),
      variant: z.string(),
    })
  ),
  division: z.string({
    message: 'Division is required',
  }),
  district: z.string({
    message: 'District is required',
  }),
  sub_district: z.string({
    message: 'Upazilla is required',
  }),
  address: z.string({
    message: 'Address is required',
  }),
  coupon_code: z.string().optional(),
  instruction: z.string().optional(),
});

const createOrderValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = createOrderValidationSchema.parse(req.body);
    next();
  } catch (error) {
    const result = createOrderValidationSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type CreateOrderInput = z.infer<typeof createOrderValidationSchema>;
export { createOrderValidation };
