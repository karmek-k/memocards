import { Router } from 'express';
import { getRepository } from 'typeorm';
import auth from '../middleware/auth';
import fetchDeck from '../middleware/fetchDeck';
import { Answer } from '../models/Answer';
import { Card } from '../models/Card';
import { Deck } from '../models/Deck';
import { Review } from '../models/Review';
import { User } from '../models/User';

const router = Router();

router.post('/', auth, fetchDeck('query'), async (req, res) => {
  const deck = res.locals.deck as Deck;
  const cardRepo = getRepository(Card);
  const { answers } = req.body;

  const { id: userId } = req.user! as User;
  const user = (await getRepository(User).findOne(userId)) as User;

  if (!answers || answers.length === 0) {
    return res.status(400).send();
  }

  const cards: Card[] = [];
  for (const cardId of req.body) {
    let card;

    try {
      card = await cardRepo.findOne(cardId);
    } catch (e) {
      return res.status(400).send('Answers contain an invalid card id');
    }

    if (!card) {
      return res.status(404).send();
    }

    cards.push(card);
  }

  const review = new Review();
  review.deck = deck;
  review.user = user;
  review.answers = answers.map((a: Answer) => {
    const answer = new Answer();
    answer.correct = a.correct;
    answer.card = cards.find(card => card.id === a.id)!;

    return answer;
  });

  await getRepository(Review).save(review);

  return res.status(201).send({
    deckName: deck.name,
    date: review.date,
    answerCount: {
      correct: review.answers.filter(a => a.correct).length,
      incorrect: review.answers.filter(a => !a.correct).length
    }
  });
});

router.get('/', auth, async (req, res) => {
  const { id } = req.user! as User;

  const user = await getRepository(User).findOne(id, {
    relations: ['reviews']
  });

  return res.send({ reviews: user?.reviews ?? [] });
});

export default router;
