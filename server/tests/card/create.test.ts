import request from 'supertest';
import { Deck } from '../../src/models/Deck';
import app from '../../src/server';
import { afterEachHandler, beforeEachHandler } from '../functions';

describe('Card creation tests', () => {
  let jwt: string;
  let deck: Deck;
  const creds = {
    username: 'tester',
    password: 'secret'
  };
  const deckData = {
    name: 'Test deck'
  };

  beforeEach(async () => {
    await beforeEachHandler();

    await request(app).post('/user').send(creds);
    jwt = await (await request(app).post('/user/token').send(creds)).body.token;

    deck = await (
      await request(app)
        .post('/deck')
        .auth(jwt, { type: 'bearer' })
        .send(deckData)
    ).body;
  });

  afterEach(afterEachHandler);

  it('should create a card for an existing deck and retrieve it', async () => {
    const res = await request(app)
      .post('/card')
      .auth(jwt, { type: 'bearer' })
      .send({ deckId: deck.id, front: 'テスト', back: 'test' });

    const expectedCard = {
      id: res.body.id,
      front: 'テスト',
      back: 'test'
    };
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(expectedCard);

    const res2 = await request(app)
      .get(`/deck/${deck.id}/cards`)
      .auth(jwt, { type: 'bearer' })
      .send();

    expect(res2.statusCode).toBe(200);
    expect(res2.body).toContainEqual(expectedCard);
  });
});
