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
  });

  afterEach(afterEachHandler);

  it('should check valid answers (all true)', async () => {
    const answers = review.cards.map(card => {
      return {
        card: card.id,
        correct: true
      };
    });

    const res = await request(app)
      .post('/review')
      .auth(jwt, { type: 'bearer' })
      .send({ answers });

    expect(res.statusCode).toBe(201);
    expect(res.body.answerCount.correct).toBe(answers.length);
  });

  it('should return 400 for an empty deck', async () => {
    const res = await request(app)
      .post('/review')
      .auth(jwt, { type: 'bearer' })
      .send({ answers: [] });

    expect(res.statusCode).toBe(400);
  });

  it('should return 400 for undefined deck', async () => {
    const res = await request(app)
      .post('/review')
      .auth(jwt, { type: 'bearer' })
      .send();

    expect(res.statusCode).toBe(400);
  });
});
