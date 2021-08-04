import request from 'supertest';
import app from '../../src/server';
import { afterEachHandler, beforeEachHandler } from '../functions';

describe('Deck cards retrieval tests', () => {
  let jwt: string;
  const creds = {
    username: 'tester',
    password: 'secret'
  };

  beforeEach(async () => {
    await beforeEachHandler();

    await request(app).post('/user').send(creds);
    jwt = await (await request(app).post('/user/token').send(creds)).body.token;

    await request(app)
      .post('/deck')
      .auth(jwt, { type: 'bearer' })
      .send({ name: 'Test deck', description: 'Test description' });
  });

  afterEach(afterEachHandler);

  it('should return an empty list for an empty deck', async () => {
    const res = await request(app)
      .get('/deck/1/cards')
      .auth(jwt, { type: 'bearer' })
      .send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('should return cards of a deck if there are any', async () => {
    await request(app).post('/card').auth(jwt, { type: 'bearer' }).send({
      deckId: '1',
      front: 'witaj',
      back: 'welcome'
    });

    const res = await request(app)
      .get('/deck/1/cards')
      .auth(jwt, { type: 'bearer' })
      .send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0].id).toBe(1);
  });

  it('should return 404 for an invalid id', async () => {
    const res = await request(app)
      .get('/deck/abc/cards')
      .auth(jwt, { type: 'bearer' })
      .send();

    expect(res.statusCode).toBe(404);
  });
});
