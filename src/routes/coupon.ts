import { Router } from 'express';
import { createCoupon } from '../controllers/coupon/create_coupon';
import { deleteCoupon } from '../controllers/coupon/delete_coupon';
import { getCoupon } from '../controllers/coupon/get_coupon';
import { getCouponByCode } from '../controllers/coupon/get_coupon_by_code';
import { updateCoupon } from '../controllers/coupon/update_coupon';
import { verifyAdmin } from '../middlewares/verify_admin';
import verifyToken from '../middlewares/verify_token';
import { createCouponValidation } from '../validation/coupon/create_coupon';
import { updateCouponValidation } from '../validation/coupon/update_coupon';

const router = Router();

router.post('/', verifyToken, verifyAdmin, createCouponValidation, createCoupon);
router.get('/', verifyToken, verifyAdmin, getCoupon);
router.get('/:code', getCouponByCode);
router.put('/:couponId', verifyToken, verifyAdmin, updateCouponValidation, updateCoupon);
router.delete('/:couponId', verifyToken, verifyAdmin, deleteCoupon);

export { router as couponRoutes };
