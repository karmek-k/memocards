import { createConnection, getConnection } from 'typeorm';
import { User } from '../src/models/User';
import { Deck } from '../src/models/Deck';
import { Card } from '../src/models/Card';

export async function beforeEachHandler() {
  await createConnection({
    type: 'sqlite',
    database: ':memory:',
    // entities: ['../src/models/*.ts'],
    entities: [User, Deck, Card],
    synchronize: true,
    dropSchema: true
  });
}

export async function afterEachHandler() {
  await getConnection().close();
}
