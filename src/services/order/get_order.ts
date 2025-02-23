import { IOrder, Order } from '../../models/Order';

const getOrderService = async (): Promise<IOrder[] | undefined> => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).select({
      updatedAt: 0,
    });
    return orders || [];
  } catch (error) {
    console.log('Error in getOrderService', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { getOrderService };
