import { Router } from 'express';
import { getRepository } from 'typeorm';
import auth from '../middleware/auth';
import { Card } from '../models/Card';
import { Deck } from '../models/Deck';
import { User } from '../models/User';

const router = Router();

router.post('/', auth, async (req, res) => {
  const { deckId, front, back } = req.body;
  const user = req.user! as User;

  const deck = await getRepository(Deck).findOne(deckId, {
    relations: ['author', 'cards']
  });

  if (!deck) {
    return res.status(404).send();
  }

  if (deck.author.id !== user.id) {
    return res.status(403).send();
  }

  const card = new Card();
  card.front = front;
  card.back = back;

  deck.cards.push(card);

  await getRepository(Deck).save(deck);

  return res.status(201).send(card);
});

export default router;
