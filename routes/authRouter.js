import express from 'express';
import { validateBody, validateParams } from '../middlewares/requestValidator.js';
import {
    registerSchema,
    loginSchema,
    subscriptionSchema,
    verifyVerificationTokenSchema,
    getVerificationEmailSchema,
} from '../schemas/authSchemas.js';
import authCtrl from '../controllers/authControllers.js';
import authenticate from '../middlewares/authenticate.js';

const authRouter = express.Router();

authRouter.post('/register', validateBody(registerSchema), authCtrl.register);

authRouter.post('/login', validateBody(loginSchema), authCtrl.login);

authRouter.get(
    '/verify/:verificationToken',
    validateParams(verifyVerificationTokenSchema),
    authCtrl.verifyValidationToken
);

authRouter.post('/verify', validateBody(getVerificationEmailSchema), authCtrl.getVerificationEmail);

authRouter.use(authenticate);

authRouter.post('/logout', authCtrl.logout);

authRouter.get('/current', authCtrl.current);

authRouter.post('/subscription', validateBody(subscriptionSchema), authCtrl.subscription);

export default authRouter;
