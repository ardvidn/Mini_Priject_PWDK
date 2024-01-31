import {
  eventCreate,
  eventUpdate,
  eventDelete,
  getEventAll,
  getEventAllById,
  getCategoryEvent,
} from '@/controllers/event.controller';
import { reviewEvent } from '@/controllers/review.controller';
import { eventValidator } from '@/middleware/event.valdation.middleware';
import { Router } from 'express';

const eventRouter = Router();

eventRouter.get('/category', getCategoryEvent);
eventRouter.get('/', getEventAll);
eventRouter.get('/:id', getEventAllById);
eventRouter.post('/create', eventValidator, eventCreate);
eventRouter.patch('/update/:id', eventValidator, eventUpdate);
eventRouter.delete('/delete/:id', eventDelete);
eventRouter.post('/:id/review', reviewEvent);

export default eventRouter;
