import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions
} from 'passport-jwt';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

export default new JwtStrategy(options, async (payload, done) => {
  let user;
  try {
    user = await getRepository(User).findOne(payload.userId);
  } catch (e) {
    return done(e);
  }

  if (!user) {
    return done(null, false);
  }

  return done(null, user);
});
