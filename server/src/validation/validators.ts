import { body } from 'express-validator';

export const userValidator = [
  body('username').isAlphanumeric().isLength({ min: 3, max: 20 }),
  body('password').isLength({ min: 5, max: 100 })
];
