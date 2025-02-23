import { TQuery } from '../../controllers/product/get_product';
import { IProduct, Product } from '../../models/Product';

type IProductQuery = {
  is_featured?: boolean;
  is_deleted?: boolean;
  sell_count?: { $gte: number };
  is_upcoming?: boolean;
  category?: { $in: string[] };
  price?: { $gte?: number; $lte?: number };
};

const getProductService = async (props: Partial<IProduct> & TQuery): Promise<IProduct[] | undefined> => {
  const { is_featured, is_deleted, sell_count, is_upcoming, category, min_price, max_price } = props;
  const categories = category?.split(',');
  try {
    const query: IProductQuery = {};
    if (is_featured) query.is_featured = is_featured;
    if (is_deleted) query.is_deleted = is_deleted;
    if (sell_count) query.sell_count = { $gte: +sell_count };
    if (is_upcoming) query.is_upcoming = is_upcoming;
    if (category && Array.isArray(categories)) query.category = { $in: categories };
    const convert_min_price = Number(min_price || 0);
    const convert_max_price = Number(max_price || 0);
    if (convert_min_price && convert_max_price) {
      query.price = { $gte: convert_min_price, $lte: convert_max_price };
    } else if (convert_min_price) {
      query.price = { $gte: convert_min_price };
    } else if (convert_max_price) {
      query.price = { $lte: convert_max_price };
    }

    const products = await Product.find(query as any)
      .sort({ createdAt: -1 })
      .select({
        variants: 0,
        createdAt: 0,
        updatedAt: 0,
      });
    return products || [];
  } catch (error) {
    console.log('Error in getProductService', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { getProductService };
