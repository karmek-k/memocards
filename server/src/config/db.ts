import { ConnectionOptions } from 'typeorm';
import { Card } from '../models/Card';
import { Deck } from '../models/Deck';
import { User } from '../models/User';

const config: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Deck, Card],
  synchronize: true
};

export default config;
