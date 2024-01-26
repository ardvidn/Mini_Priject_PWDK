import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const eventValidator = [
  body('title').notEmpty().withMessage('please fill the title of your event'),
  body('description')
    .notEmpty()
    .withMessage('please fill the description of your event'),
  body('event_date')
    .notEmpty()
    .withMessage('please fill the event date of your event'),
  body('location')
    .notEmpty()
    .withMessage('please fill the location of your event'),
  body('available_seat')
    .notEmpty()
    .withMessage('please fill the availibility seat of your event'),
  body('category_event')
    .notEmpty()
    .withMessage('please fill the event category of your event'),
  body('price')
    .notEmpty()
    .withMessage('please fill the price of your event'),
  body('image').notEmpty().withMessage('please fill the image of your event'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
  },
];
