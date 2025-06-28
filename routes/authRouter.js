import express from 'express';
import validateBody from '../middlewares/validateBody.js';
import { registerSchema, loginSchema, subscriptionSchema } from '../schemas/authSchemas.js';
import authCtrl from '../controllers/authControllers.js';
import authenticate from '../middlewares/authenticate.js';

const authRouter = express.Router();

authRouter.post('/register', validateBody(registerSchema), authCtrl.register);

authRouter.post('/login', validateBody(loginSchema), authCtrl.login);

authRouter.use(authenticate);

authRouter.post('/logout', authCtrl.logout);

authRouter.get('/current', authCtrl.current);

authRouter.post('/subscription', validateBody(subscriptionSchema), authCtrl.subscription);

export default authRouter;
