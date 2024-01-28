import { getUserDetail } from '@/controllers/user.controller';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/detailUser/:id', getUserDetail);

export default userRouter;
