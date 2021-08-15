import { Router } from 'express';
import auth from '../middleware/auth';
import fetchDeck from '../middleware/fetchDeck';
import { Deck } from '../models/Deck';
import { randomSubset } from '../utils/random';

const router = Router();

router.get('/:deckId', auth, fetchDeck('cards'), async (req, res) => {
  const deck = res.locals.deck as Deck;

  const cardCount = deck.cards.length;
  let reviewCount = Number(req.query.count ?? cardCount);

  if (reviewCount <= 0 || reviewCount > cardCount) {
    return res.status(400).send();
  }

  return res.send({ cards: randomSubset(deck.cards, reviewCount) });
});

export default router;
