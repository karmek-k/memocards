import { ConnectionOptions } from 'typeorm';
import { Answer } from '../models/Answer';
import { Card } from '../models/Card';
import { Deck } from '../models/Deck';
import { Review } from '../models/Review';
import { User } from '../models/User';
import dotenv from 'dotenv';
dotenv.config();

const config: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Deck, Card, Review, Answer],
  synchronize: true
};

export default config;
