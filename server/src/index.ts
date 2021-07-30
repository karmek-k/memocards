import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import dbConfig from './config/db';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

createConnection(dbConfig)
  .then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch(console.error);
