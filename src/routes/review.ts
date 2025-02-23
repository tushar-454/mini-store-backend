import { Router } from 'express';
import { createReview } from '../controllers/review/create_review';
import { getReview } from '../controllers/review/get_review';
import { updateReview } from '../controllers/review/update_review';
import { verifyAdmin } from '../middlewares/verify_admin';
import verifyToken from '../middlewares/verify_token';
import verifyUser from '../middlewares/verify_user';
import { createReviewValidation } from '../validation/review/create_review';
import { updateReviewValidation } from '../validation/review/update_review';

const router = Router();

router.post('/:orderId', verifyToken, verifyUser, createReviewValidation, createReview);
router.get('/', getReview);
router.put('/:reviewId', verifyToken, verifyAdmin, updateReviewValidation, updateReview);

export { router as reviewRoutes };
