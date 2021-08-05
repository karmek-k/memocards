import { body } from 'express-validator';

export const userValidator = [
  body('username').isAlphanumeric().isLength({ min: 3, max: 20 }),
  body('password').isLength({ min: 5, max: 100 })
];

export const deckValidator = [
  body('name').isLength({ min: 2, max: 30 }),
  body('description').optional({ nullable: true }).isLength({ max: 500 })
];

export const cardValidator = [
  body('deckId').isNumeric(),
  body('front').isLength({ max: 200 }),
  body('back').isLength({ max: 200 })
];
