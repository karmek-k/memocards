import request from 'supertest';
import { Deck } from '../../src/models/Deck';
import app from '../../src/server';
import { afterEachHandler, beforeEachHandler } from '../functions';

async function addCard(
  jwt: string,
  deckId: number,
  front: string,
  back: string
) {
  await request(app)
    .post('/card')
    .auth(jwt, { type: 'bearer' })
    .send({ deckId, front, back });
}

describe('Deck review tests', () => {
  let jwt: string;
  let allCardCount: number;
  let deck: Deck;
  const creds = {
    username: 'tester',
    password: 'secret'
  };

  beforeEach(async () => {
    await beforeEachHandler();

    await request(app).post('/user').send(creds);
    jwt = await (await request(app).post('/user/token').send(creds)).body.token;

    deck = (
      await request(app).post('/deck').auth(jwt, { type: 'bearer' }).send({
        name: 'test deck'
      })
    ).body;

    // add some cards
    allCardCount = 3;
    await addCard(jwt, deck.id, 'テスト', 'test');
    await addCard(jwt, deck.id, 'テキスト', 'text');
    await addCard(jwt, deck.id, 'ミルク', 'milk');
  });

  afterEach(afterEachHandler);

  it('should return all cards for a review', async () => {
    const res = await request(app)
      .get(`/deck/${deck.id}/review`)
      .auth(jwt, { type: 'bearer' })
      .send();

    expect(res.statusCode).toBe(200);
    expect(res.body.cards).toHaveLength(allCardCount);
  });

  it('should return some (count < n) cards for a review', async () => {
    const count = 2;

    const res = await request(app)
      .get(`/deck/${deck.id}/review?count=${count}`)
      .auth(jwt, { type: 'bearer' })
      .send();

    expect(res.statusCode).toBe(200);
    expect(res.body.cards).toHaveLength(count);
  });

  it('should return 400 for zero', async () => {
    const count = 0;

    const res = await request(app)
      .get(`/deck/${deck.id}/review?count=${count}`)
      .auth(jwt, { type: 'bearer' })
      .send();

    expect(res.statusCode).toBe(400);
  });

  it('should return 400 for a negative number', async () => {
    const count = -1;

    const res = await request(app)
      .get(`/deck/${deck.id}/review?count=${count}`)
      .auth(jwt, { type: 'bearer' })
      .send();

    expect(res.statusCode).toBe(400);
  });

  it('should return a negative number greater than n', async () => {
    const count = allCardCount + 1;

    const res = await request(app)
      .get(`/deck/${deck.id}/review?count=${count}`)
      .auth(jwt, { type: 'bearer' })
      .send();

    expect(res.statusCode).toBe(400);
  });
});
