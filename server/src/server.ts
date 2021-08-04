import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import express from 'express';
import passport from 'passport';
import jwtStrategy from './config/jwtStrategy';
import { Strategy as AnonymousStrategy } from 'passport-anonymous';
import UserRouter from './routes/user';
import DeckRouter from './routes/deck';
import CardRouter from './routes/card';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
passport.use(new AnonymousStrategy());
passport.use(jwtStrategy);
app.use(passport.authenticate(['jwt', 'anonymous'], { session: false }));

// Routes
app.use('/user', UserRouter);
app.use('/deck', DeckRouter);
app.use('/card', CardRouter);

export default app;
