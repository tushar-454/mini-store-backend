import { IOrder, Order } from '../../models/Order';

type getOrderServiceParameter = {
  startDate?: string;
  endDate?: string;
  status?: string;
};

const getOrderService = async ({ startDate, endDate, status }: getOrderServiceParameter): Promise<IOrder[] | undefined> => {
  try {
    let query: any = {};
    if (status) query.status = status;
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lt: new Date(endDate),
      };
    }
    if (startDate && !endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
      };
    }
    if (!startDate && endDate) {
      query.createdAt = {
        $lt: new Date(endDate),
      };
    }
    const orders = await Order.find(query).sort({ createdAt: -1 }).select({
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
