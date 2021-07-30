import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import dbConfig from './config/db';
import passport from 'passport';
import jwtStrategy from './config/jwtStrategy';
import UserRouter from './routes/user';

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
passport.use(jwtStrategy);

// Routes
app.use('/user', UserRouter);

createConnection(dbConfig)
  .then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch(console.error);
