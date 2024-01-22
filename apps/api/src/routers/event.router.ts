import { eventCreate } from '@/controllers/event.controller';
import { eventValidator } from '@/middleware/event.valdation.middleware';
import { Router } from 'express';

const eventRouter = Router();

eventRouter.get('/');
eventRouter.post('/create', eventValidator, eventCreate);
eventRouter.patch('/update/:eventId');
eventRouter.delete('/delete/:id');

export default eventRouter;
