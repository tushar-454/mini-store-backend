import { Router } from 'express';
import { createProduct } from '../controllers/product/create_product';
import { deleteProduct } from '../controllers/product/delete_product';
import { getProduct } from '../controllers/product/get_product';
import { getProductBySlug } from '../controllers/product/get_product_by_slug';
import { updateProduct } from '../controllers/product/update_product';
import { verifyAdmin } from '../middlewares/verify_admin';
import verifyToken from '../middlewares/verify_token';
import { createProductValidation } from '../validation/product/create_product';
import { updateProductValidation } from '../validation/product/update_product';

const router = Router();

router.post('/', verifyToken, verifyAdmin, createProductValidation, createProduct);
router.get('/', getProduct);
router.get('/:slug', getProductBySlug);
router.put('/:productId', verifyToken, verifyAdmin, updateProductValidation, updateProduct);
router.delete('/:productId', verifyToken, verifyAdmin, deleteProduct);

export { router as productRoutes };
