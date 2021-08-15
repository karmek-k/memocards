import { NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Deck } from '../models/Deck';
import { User } from '../models/User';

function fetchDeck(...relations: string[]) {
  return async (req: any, res: any, next: NextFunction) => {
    let deck = await getRepository(Deck).findOne(req.params.id, {
      relations: ['author', ...relations]
    });

    if (!deck) {
      return res.status(404).send();
    }

    let notYours = true;
    if (req.user) {
      notYours = (req.user as User).id !== deck.author.id;
    }

    if (deck.private && notYours) {
      return res.status(403).send();
    }

    res.locals.deck = deck;
    next();
  };
}

export default fetchDeck;
