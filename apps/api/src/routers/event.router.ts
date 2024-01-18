import { eventCreate } from '@/controllers/event.controller';
import { Router } from 'express';

const eventRouter = Router();

eventRouter.get('/');
eventRouter.post('/create', eventCreate);
eventRouter.patch('/update/:id');
eventRouter.delete('/delete/:id');

export default eventRouter;
