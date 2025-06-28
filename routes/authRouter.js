import express from 'express';
import { validateBody, validateAvatar } from '../middlewares/validateBody.js';
import { registerSchema, loginSchema, subscriptionSchema } from '../schemas/authSchemas.js';
import authCtrl from '../controllers/authControllers.js';
import authenticate from '../middlewares/authenticate.js';
import upload from '../helpers/multerStorage.js';

const authRouter = express.Router();

authRouter.post('/register', validateBody(registerSchema), authCtrl.register);

authRouter.post('/login', validateBody(loginSchema), authCtrl.login);

authRouter.use(authenticate);

authRouter.post('/logout', authCtrl.logout);

authRouter.get('/current', authCtrl.current);

authRouter.post('/subscription', validateBody(subscriptionSchema), authCtrl.subscription);

authRouter.patch('/avatars', upload.single('avatar'), validateAvatar, authCtrl.updateAvatar);

export default authRouter;
