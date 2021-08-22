import request from 'supertest';
import { Card } from '../../src/models/Card';
import { Deck } from '../../src/models/Deck';
import app from '../../src/server';
import { addCard, afterEachHandler, beforeEachHandler } from '../functions';

describe('Review check tests', () => {
  let jwt: string;
  let deck: Deck;
  let review: { cards: Card[] };
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

    await addCard(app, jwt, deck.id, '火', 'fire');
    await addCard(app, jwt, deck.id, '風', 'wind');
    await addCard(app, jwt, deck.id, '水', 'water');
    await addCard(app, jwt, deck.id, '土', 'soil');
    await addCard(app, jwt, deck.id, '金', 'gold');

    review = (
      await request(app)
        .get(`/deck/${deck.id}/review`)
        .auth(jwt, { type: 'bearer' })
        .send()
    ).body;

    const answers = review.cards.map(card => {
      return {
        card: card.id,
        correct: true
      };
    });

    await request(app)
      .post('/review')
      .auth(jwt, { type: 'bearer' })
      .send({ answers });
  });

  afterEach(afterEachHandler);

  it('should return one review', async () => {
    const res = await request(app)
      .get('/review/1')
      .auth(jwt, { type: 'bearer' })
      .send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('review');
    expect(res.body.review.id).toBe(1);
  });
});
