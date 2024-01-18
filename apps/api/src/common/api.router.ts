import authRouter from '@/routers/auth.router';
import eventRouter from '@/routers/event.router';
import { Router } from 'express';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/event', eventRouter);

export default apiRouter;
