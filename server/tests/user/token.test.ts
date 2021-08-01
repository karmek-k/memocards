import request from 'supertest';
import app from '../../src/server';
import { afterEachHandler, beforeEachHandler } from '../functions';

describe('User token tests', () => {
  beforeEach(async () => {
    await beforeEachHandler();
    await request(app).post('/user').send({
      username: 'tester',
      password: 'secret'
    });
  });

  afterEach(afterEachHandler);

  it('should get the jwt for a registered user', async () => {
    const res = await request(app).post('/user/token').send({
      username: 'tester',
      password: 'secret'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.token).toBeTruthy();
  });

  it('should not get the jwt for a non-existent user', async () => {
    const res = await request(app).post('/user/token').send({
      username: 'tester2',
      password: 'hfiuoerwshfoiwehjoi'
    });

    expect(res.statusCode).toBe(404);
    expect(res.body).not.toHaveProperty('token');
    expect(res.body.token).not.toBeTruthy();
  });

  it('should not get the jwt for invalid credentials', async () => {
    const res = await request(app).post('/user/token').send({
      username: 'tester',
      password: 'not-secret-anymore'
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).not.toHaveProperty('token');
    expect(res.body.token).not.toBeTruthy();
  });
});
