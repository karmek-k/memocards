import { NextFunction } from 'express';
import passport from 'passport';

function auth(req: any, res: any, next: NextFunction) {
  passport.authenticate('jwt', { session: false })(req, res, next);
}

export default auth;
