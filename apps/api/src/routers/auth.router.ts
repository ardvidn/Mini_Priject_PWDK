import { signinUser, signupUser } from '@/controllers/auth.controller';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/signin', signinUser);
authRouter.post('/signup', signupUser);

export default authRouter;
