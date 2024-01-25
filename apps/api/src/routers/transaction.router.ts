import { transactionEvent } from '@/controllers/transaction.controller';
import { Router } from 'express';

const transactionRouter = Router();

transactionRouter.get('/:id', transactionEvent);

export default transactionRouter;
