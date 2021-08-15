import { Router } from 'express';
import auth from '../middleware/auth';
import fetchDeck from '../middleware/fetchDeck';
import { Deck } from '../models/Deck';

const router = Router();

function randomItem(items: any[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomSubset<T>(items: T[], n: number) {
  if (n >= items.length) {
    return items;
  } else if (n <= 0) {
    return [];
  }

  const subset: T[] = [];

  for (let i = 0; i < n; ++i) {
    const remaining = items.filter(item => !subset.includes(item));

    if (remaining.length === 0) {
      break;
    }

    subset.push(randomItem(remaining));
  }

  return subset;
}

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
