import { NextFunction } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

function validate(validator: ValidationChain[]): any {
  return [
    validator,
    (req: any, res: any, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send();
      }
      next();
    }
  ];
}

export default validate;
