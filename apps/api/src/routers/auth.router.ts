import {
  signinUser,
  signoutUser,
  signupUser,
} from '@/controllers/auth.controller';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/signin', signinUser);
authRouter.post('/signup', signupUser);
authRouter.post('/signout', signoutUser);

export default authRouter;
