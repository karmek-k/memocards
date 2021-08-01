import { createConnection, getConnection } from 'typeorm';
import request from 'supertest';
import app from '../../src/server';
import { User } from '../../src/models/User';
import { Deck } from '../../src/models/Deck';
import { Card } from '../../src/models/Card';

describe('User creation tests', () => {
  beforeEach(async () => {
    await createConnection({
      type: 'sqlite',
      database: ':memory:',
      // entities: ['../src/models/*.ts'],
      entities: [User, Deck, Card],
      synchronize: true,
      dropSchema: true
    });
  });

  afterEach(async () => {
    await getConnection().close();
  });

  it('should create a user with valid credentials', async () => {
    const res = await request(app).post('/user').send({
      username: 'tester',
      password: 'secret'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('username');
    expect(res.body).not.toHaveProperty('password');
  });

  it('should discard invalid credentials', async () => {
    const res = await request(app).post('/user').send({
      username: 't',
      password: null
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).not.toHaveProperty('username');
    expect(res.body).not.toHaveProperty('password');
  });

  it('should not create a user with duplicated name', async () => {
    await request(app).post('/user').send({
      username: 'tester',
      password: 'sztywniutko'
    });

    const res = await request(app).post('/user').send({
      username: 'tester',
      password: '12345'
    });

    expect(res.statusCode).toBe(409);
    expect(res.body).not.toHaveProperty('username');
    expect(res.body).not.toHaveProperty('password');
  });
});
