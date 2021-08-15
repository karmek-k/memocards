import { Router } from 'express';
import { getRepository } from 'typeorm';
import auth from '../middleware/auth';
import fetchDeck from '../middleware/fetchDeck';
import { Deck } from '../models/Deck';
import { User } from '../models/User';
import validate from '../validation/middleware';
import { deckValidator } from '../validation/validators';

const router = Router();

router.get('/:deckId', fetchDeck, async (req, res) => {
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

router.get('/:id/cards', auth, async (req, res) => {
  const deck = await getRepository(Deck).findOne(req.params.id, {
    relations: ['cards']
  });

  if (!deck) {
    return res.status(404).send();
  }

  return res.send(deck.cards);
});

export default router;
