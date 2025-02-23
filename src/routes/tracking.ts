import { Router } from 'express';
import { orderTracking } from '../controllers/tracking/order_tracking';

const router = Router();

router.get('/:trackingId', orderTracking);

export { router as trackingRouter };
