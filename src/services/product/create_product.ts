import { IProduct, Product } from '../../models/Product';
import { CreateProductInput } from '../../validation/product/create_product';

const createProductService = async (product: CreateProductInput): Promise<IProduct | undefined> => {
  const { name, description, price, discount, category, images, variants } = product;
  try {
    const slug = name.toLowerCase().replace(/ /g, '-');
    const new_product = await Product.create({ name, description, price, discount, category, images, variants, slug });
    await new_product.save();
    return new_product;
  } catch (error) {
    console.error('Error creating product:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { createProductService };
