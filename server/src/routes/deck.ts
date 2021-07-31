import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Deck } from '../models/Deck';

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

export default router;
