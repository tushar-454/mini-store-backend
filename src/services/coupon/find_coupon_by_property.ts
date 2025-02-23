import { Coupon, ICoupon } from '../../models/Coupon';

const findCouponByProperty = async (property: string, value: string): Promise<ICoupon | undefined> => {
  try {
    const coupon = await Coupon.findOne({
      [property]: value,
    });
    return coupon || undefined;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    console.error('Error finding coupon by property:', error);
  }
};

export { findCouponByProperty };
