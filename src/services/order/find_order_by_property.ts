import { IOrder, Order } from '../../models/Order';

const findOrderByProperty = async (property: string, value: string): Promise<IOrder | undefined> => {
  try {
    const order = await Order.findOne({
      [property]: value,
    });
    return order || undefined;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    console.error('Error finding order by property:', error);
  }
};

export { findOrderByProperty };
