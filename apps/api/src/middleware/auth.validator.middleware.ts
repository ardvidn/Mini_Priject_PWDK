import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const signUpValidator = [
  body('email').isEmail().notEmpty().withMessage('please fill with your email'),
  body('username').notEmpty().withMessage('please fill with username'),
  body('password').notEmpty().withMessage('please fill the password'),
  body('referralCode'),

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
