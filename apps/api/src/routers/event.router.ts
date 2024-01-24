import { eventCreate, eventUpdate, eventDelete, getEventAll, getEventAllById } from '@/controllers/event.controller';
import { eventValidator } from '@/middleware/event.valdation.middleware';
import { Router } from 'express';

const eventRouter = Router();

eventRouter.get('/', getEventAll);
eventRouter.get('/:id', getEventAllById);
eventRouter.post('/create', eventValidator, eventCreate);
eventRouter.patch('/update/:id', eventValidator, eventUpdate);
eventRouter.delete('/delete/:id', eventDelete);

export default eventRouter;
