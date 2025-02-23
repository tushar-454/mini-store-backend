import { Router } from 'express';
import { createOrder } from '../controllers/order/create_order';
import { deleteOrder } from '../controllers/order/delete_order';
import { getOrder } from '../controllers/order/get_order';
import { updateOrder } from '../controllers/order/update_order';
import { verifyAdmin } from '../middlewares/verify_admin';
import verifyToken from '../middlewares/verify_token';
import { createOrderValidation } from '../validation/order/create_order';

const router = Router();

router.post('/', createOrderValidation, createOrder);
router.get('/', verifyToken, verifyAdmin, getOrder);
router.put('/:orderId', verifyToken, verifyAdmin, updateOrder);
router.delete('/:orderId', verifyToken, verifyAdmin, deleteOrder);

export { router as orderRoutes };
