import { Router } from 'express';
import { createCarousel } from '../controllers/carousel/create_carousel';
import { deleteCarousel } from '../controllers/carousel/delete_carousel';
import { getCarousel } from '../controllers/carousel/get_carousel';
import { updateCarousel } from '../controllers/carousel/update_carousel';
import { verifyAdmin } from '../middlewares/verify_admin';
import verifyToken from '../middlewares/verify_token';
import { createCarouselValidation } from '../validation/carousel/create_carousel';
import { updateCarouselValidation } from '../validation/carousel/update_carousel';

const router = Router();

router.post('/', verifyToken, verifyAdmin, createCarouselValidation, createCarousel);
router.get('/', getCarousel);
router.put('/:carouselId', verifyToken, verifyAdmin, updateCarouselValidation, updateCarousel);
router.delete('/:carouselId', verifyToken, verifyAdmin, deleteCarousel);

export { router as carouselRoutes };
