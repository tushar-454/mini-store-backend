import { Router } from 'express';
import { createGallery } from '../controllers/gallery/create_gallery';
import { deleteGallery } from '../controllers/gallery/delete_gallery';
import { getGallery } from '../controllers/gallery/get_gallery';
import { updateGallery } from '../controllers/gallery/update_gallery';
import { verifyAdmin } from '../middlewares/verify_admin';
import verifyToken from '../middlewares/verify_token';
import { createGalleryValidation } from '../validation/gallery/create_gallery';
import { updateGalleryValidation } from '../validation/gallery/update_gallery';

const router = Router();

router.post('/', verifyToken, verifyAdmin, createGalleryValidation, createGallery);
router.get('/', getGallery);
router.put('/:galleryId', verifyToken, verifyAdmin, updateGalleryValidation, updateGallery);
router.delete('/:galleryId', verifyToken, verifyAdmin, deleteGallery);

export { router as galleryRoutes };
