import request from 'supertest';
import app from '../../src/server';
import { afterEachHandler, beforeEachHandler } from '../functions';

describe('User info tests', () => {
  let jwt: string;
  const creds = {
    username: 'tester',
    password: 'secret'
  };

  beforeEach(async () => {
    await beforeEachHandler();

    await request(app).post('/user').send(creds);
    jwt = await (await request(app).post('/user/token').send(creds)).body.token;
  });

  afterEach(afterEachHandler);

  it('should get info about an existing user', async () => {
    const res = await request(app)
      .get('/user')
      .auth(jwt, { type: 'bearer' })
      .send();

    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe('tester');
  });
});
