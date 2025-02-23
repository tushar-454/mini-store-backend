import { IOrder, Order } from '../../models/Order';

const createOrderService = async (order: Partial<IOrder>): Promise<IOrder | undefined> => {
  const { name, email, phone, line_items, price, discount, shipping, division, district, sub_district, address, coupon_code, coupon_discount, tracking_id, instruction } = order;
  try {
    const new_order = await Order.create({
      name,
      email,
      phone,
      line_items,
      price,
      discount,
      shipping,
      division,
      district,
      sub_district,
      address,
      coupon_code,
      coupon_discount,
      tracking_id,
      instruction,
    });
    await new_order.save();
    return new_order;
  } catch (error) {
    console.error('Error creating order:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { createOrderService };
