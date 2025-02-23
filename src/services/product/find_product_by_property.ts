import { IProduct, Product } from '../../models/Product';

const findProductByProperty = async (property: string, value: string): Promise<IProduct | undefined> => {
  try {
    const product = await Product.findOne({
      [property]: value,
    });
    return product || undefined;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    console.error('Error finding product by property:', error);
  }
};

export { findProductByProperty };
