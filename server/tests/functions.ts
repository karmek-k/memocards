import { createConnection, getConnection } from 'typeorm';
import { User } from '../src/models/User';
import { Deck } from '../src/models/Deck';
import { Card } from '../src/models/Card';
import { Review } from '../src/models/Review';
import { Answer } from '../src/models/Answer';

export async function beforeEachHandler() {
  await createConnection({
    type: 'sqlite',
    database: ':memory:',
    // entities: ['../src/models/*.ts'],
    entities: [User, Deck, Card, Review, Answer],
    synchronize: true,
    dropSchema: true
  });
}

export async function afterEachHandler() {
  await getConnection().close();
}
