import { Coupon, ICoupon } from '../../models/Coupon';

const getCouponService = async (): Promise<Omit<ICoupon, 'createdAt' | 'updatedAt'>[] | undefined> => {
  try {
    const coupons = await Coupon.find().select({
      createdAt: 0,
      updatedAt: 0,
    });
    return coupons || [];
  } catch (error) {
    console.log('Error in getCouponService', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { getCouponService };
