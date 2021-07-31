import { Router } from 'express';
import { getRepository } from 'typeorm';
import auth from '../middleware/auth';
import { Deck } from '../models/Deck';
import { User } from '../models/User';

const router = Router();

router.get('/:id', async (req, res) => {
  const repo = getRepository(Deck);
  let deck;

  try {
    deck = await repo.findOne(req.params.id);
  } catch (e) {
    return res.status(400).send();
  }

  if (!deck) {
    return res.status(404).send();
  }

  return res.send(deck);
});

router.get('/', auth, async (req, res) => {
  const { id } = req.user! as User;
  const user = await getRepository(User).findOne(id);

  return res.send(user?.decks ?? []);
});

export default router;
