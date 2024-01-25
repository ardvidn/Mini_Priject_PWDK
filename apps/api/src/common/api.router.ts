import authRouter from '@/routers/auth.router';
import eventRouter from '@/routers/event.router';
import transactionRouter from '@/routers/transaction.router';
import { Router } from 'express';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/event', eventRouter);
apiRouter.use('/transaction', transactionRouter);

export default apiRouter;
