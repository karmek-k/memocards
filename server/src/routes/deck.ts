import { Router } from 'express';
import { getRepository } from 'typeorm';
import auth from '../middleware/auth';
import fetchDeck from '../middleware/fetchDeck';
import { Deck } from '../models/Deck';
import { User } from '../models/User';
import { randomSubset } from '../utils/random';
import validate from '../validation/middleware';
import { deckValidator } from '../validation/validators';

const router = Router();

router.get('/:deckId', fetchDeck(), async (req, res) => {
  return res.send(res.locals.deck);
});

router.get('/', auth, async (req, res) => {
  const { id } = req.user! as User;
  const user = await getRepository(User).findOne(id, { relations: ['decks'] });

  return res.send(user!.decks);
});

router.post('/', auth, validate(deckValidator), async (req, res) => {
  const { id } = req.user! as User;

  const user = (await getRepository(User).findOne(id)) as User;

  const deck = new Deck();
  deck.name = req.body.name;
  deck.description = req.body?.description;
  deck.author = user;
  deck.private = req.body?.private;

  await getRepository(Deck).save(deck);

  return res.status(201).send(deck);
});

router.get(
  '/:deckId/cards',
  auth,
  fetchDeck('params', 'cards'),
  async (req, res) => {
    return res.send(res.locals.deck.cards);
  }
);

router.get(
  '/:deckId/review',
  auth,
  fetchDeck('params', 'cards'),
  async (req, res) => {
    const deck = res.locals.deck as Deck;

    const cardCount = deck.cards.length;
    let reviewCount = Number(req.query.count ?? cardCount);

    if (reviewCount <= 0 || reviewCount > cardCount) {
      return res.status(400).send();
    }

    return res.send({ cards: randomSubset(deck.cards, reviewCount) });
  }
);

export default router;
