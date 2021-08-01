import request from 'supertest';
import app from '../../src/server';
import { afterEachHandler, beforeEachHandler } from '../functions';

describe('User creation tests', () => {
  beforeEach(beforeEachHandler);

  afterEach(afterEachHandler);

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
