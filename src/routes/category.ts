import { Router } from 'express';
import { createCategory } from '../controllers/category/create_category';
import { deleteCategory } from '../controllers/category/delete_category';
import { getCategory } from '../controllers/category/get_category';
import { updateCategory } from '../controllers/category/update_category';
import { verifyAdmin } from '../middlewares/verify_admin';
import verifyToken from '../middlewares/verify_token';
import { createCategoryValidation } from '../validation/category/create_category';

const router = Router();

router.post('/', verifyToken, verifyAdmin, createCategoryValidation, createCategory);
router.get('/', getCategory);
router.put('/:categoryId', verifyToken, verifyAdmin, updateCategory);
router.delete('/:categoryId', verifyToken, verifyAdmin, deleteCategory);

export { router as categoryRoutes };
