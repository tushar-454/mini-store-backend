import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

const updateCouponValidationSchema = z.object({
  code: z.string({ message: 'Coupon code is Required' }).optional(),
  type: z.enum(['flat', 'percentage'], { message: 'Coupon type is Required [flat / percentage]' }).optional(),
  discount: z.number({ message: 'Coupon discount is Required as number' }).positive({ message: 'Coupon discount must be greater than 0' }).optional(),
  quantity: z.number({ message: 'Coupon quantity is Required as number' }).optional(),
  startAt: z.string({ message: 'StartAt is Required as ISO String' }).optional(),
  expireAt: z
    .string({ message: 'ExpireAt is Required as ISO String' })
    .refine(
      (date) => {
        const expireAtDate = new Date(date).getTime();
        const currentDate = new Date().getTime();
        return currentDate < expireAtDate;
      },
      {
        message: 'ExpireAt must be greater than current date',
      }
    )
    .optional(),
});

const updateCouponValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = updateCouponValidationSchema.parse(req.body);
    next();
  } catch (error) {
    const result = updateCouponValidationSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type UpdateCouponInput = z.infer<typeof updateCouponValidationSchema>;
export { updateCouponValidation };
