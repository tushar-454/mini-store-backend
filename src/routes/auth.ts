import { Router } from 'express';
import { clearToken } from '../controllers/auth/clear_token';
import { createToken } from '../controllers/auth/create_token';
import { createUser } from '../controllers/auth/create_user';
import { getUserData } from '../controllers/auth/get_user_data';
import { createUserValidation } from '../validation/auth/create_user';

const router = Router();

router.post('/register', createUserValidation, createUser);
router.post('/token', createToken);
router.post('/logout', clearToken);
router.get('/user/:email', getUserData);

export { router as authRoutes };
