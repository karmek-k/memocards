import { ConnectionOptions } from 'typeorm';
import { User } from '../models/User';

const config: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User],
  synchronize: true
};

export default config;
