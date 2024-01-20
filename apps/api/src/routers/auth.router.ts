import {
  signinUser,
  signoutUser,
  signupUser,
} from '@/controllers/auth.controller';
import { signUpValidator } from '@/middleware/auth.validator.middleware';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/signin', signinUser);
authRouter.post('/signup', signUpValidator, signupUser);
authRouter.post('/signout', signoutUser);

export default authRouter;
