import request from 'supertest';
import app from '../../src/server';
import { afterEachHandler, beforeEachHandler } from '../functions';

describe('Deck retrieval tests', () => {
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

  it('should return no decks when none have been added', async () => {
    const res = await request(app)
      .get('/deck')
      .auth(jwt, { type: 'bearer' })
      .send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('should return decks after adding', async () => {
    await request(app).post('/deck').auth(jwt, { type: 'bearer' }).send({
      name: 'Test deck',
      description: null
    });

    const res = await request(app)
      .get('/deck')
      .auth(jwt, { type: 'bearer' })
      .send();

    const { id, name, description } = res.body[0];

    expect(res.statusCode).toBe(200);
    expect(id).toBe(1);
    expect(name).toEqual('Test deck');
    expect(description).toBeNull();
  });

  it("should only return current user's decks", async () => {
    const otherCreds = {
      username: 'developer',
      password: '12345'
    };

    await request(app).post('/user').send(otherCreds);

    const otherRes = await request(app).post('/user/token').send(otherCreds);

    await request(app)
      .post('/deck')
      .auth(otherRes.body.token, { type: 'bearer' })
      .send({
        name: 'Test deck',
        description: null
      });

    const res = await request(app)
      .get('/deck')
      .auth(jwt, { type: 'bearer' })
      .send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});
