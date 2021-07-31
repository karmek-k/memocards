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
  const user = await getRepository(User).findOne(id, { relations: ['decks'] });

  return res.send(user!.decks);
});

router.post('/', auth, async (req, res) => {
  const { id } = req.user! as User;

  const user = (await getRepository(User).findOne(id, {
    relations: ['decks']
  })) as User;

  const deck = new Deck();
  deck.name = req.body.name;
  deck.description = req.body?.description;

  const savedDeck = await getRepository(Deck).save(deck);

  user.decks.push(savedDeck);
  await getRepository(User).save(user);

  return res.status(201).send(savedDeck);
});

export default router;
