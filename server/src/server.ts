import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import express from 'express';
import passport from 'passport';
import jwtStrategy from './config/jwtStrategy';
import UserRouter from './routes/user';
import DeckRouter from './routes/deck';
import CardRouter from './routes/card';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
passport.use(jwtStrategy);

// Routes
app.use('/user', UserRouter);
app.use('/deck', DeckRouter);
app.use('/card', CardRouter);

export default app;