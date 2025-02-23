import { Router } from 'express';
import { getUsers } from '../controllers/user/get_users';
import { updateUser } from '../controllers/user/update_user';
import { verifyAdmin } from '../middlewares/verify_admin';
import verifyToken from '../middlewares/verify_token';
import { updateUserValidation } from '../validation/user/update_user';

const router = Router();

router.get('/', verifyToken, verifyAdmin, getUsers);
router.put('/:userId', updateUserValidation, verifyToken, verifyAdmin, updateUser);

export { router as usersRoutes };
