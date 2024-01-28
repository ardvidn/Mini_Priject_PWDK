import authRouter from '@/routers/auth.router';
import eventRouter from '@/routers/event.router';
import transactionRouter from '@/routers/transaction.router';
import userRouter from '@/routers/user.router';
import { Router } from 'express';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/event', eventRouter);
apiRouter.use('/transaction', transactionRouter);
apiRouter.use('/user', userRouter);

export default apiRouter;
