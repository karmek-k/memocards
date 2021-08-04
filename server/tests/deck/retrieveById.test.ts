import request from 'supertest';
import app from '../../src/server';
import { afterEachHandler, beforeEachHandler } from '../functions';

describe('Deck retrieval by id tests', () => {
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

  it('should return 404 if no such deck is found', async () => {
    const res = await request(app)
      .get('/deck/9000')
      .auth(jwt, { type: 'bearer' })
      .send();

    expect(res.statusCode).toBe(404);
  });

  it("should return 200 while fetching one's own private deck", async () => {
    const createRes = await request(app)
      .post('/deck')
      .auth(jwt, { type: 'bearer' })
      .send({ name: 'Test deck', private: true });
    console.log(createRes.body);

    const res = await request(app)
      .get(`/deck/${createRes.body.id}`)
      .auth(jwt, { type: 'bearer' })
      .send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name');
  });

  it('should return 404 at an SQL injection attempt', async () => {
    const res = await request(app)
      .get("/deck/' OR 1=1; -- ")
      .auth(jwt, { type: 'bearer' })
      .send();

    expect(res.statusCode).toBe(404);
  });

  it("should return 403 while fetching someone else's private deck", async () => {
    const otherCreds = {
      username: 'developer',
      password: '12345'
    };

    await request(app).post('/user').send(otherCreds);
    const otherJwtRes = await request(app).post('/user/token').send(otherCreds);
    const otherDeckRes = await request(app)
      .post('/deck')
      .auth(otherJwtRes.body.token, { type: 'bearer' })
      .send({ name: 'xd' });

    const res = await request(app)
      .get(`/deck/${otherDeckRes.body.id}`)
      .auth(jwt, { type: 'bearer' })
      .send();

    expect(res.statusCode).toBe(403);
  });

  it("should return 200 while fetching someone else's public deck", async () => {
    const otherCreds = {
      username: 'developer',
      password: '12345'
    };

    await request(app).post('/user').send(otherCreds);
    const otherJwtRes = await request(app).post('/user/token').send(otherCreds);
    const otherDeckRes = await request(app)
      .post('/deck')
      .auth(otherJwtRes.body.token, { type: 'bearer' })
      .send({ name: 'xd', private: false });

    const res = await request(app)
      .get(`/deck/${otherDeckRes.body.id}`)
      .auth(jwt, { type: 'bearer' })
      .send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name');
  });
});
