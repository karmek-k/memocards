import argon2 from 'argon2';
import { Router } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/', async (req, res) => {
  const user = new User();
  user.username = req.body.username;
  user.password = await argon2.hash(req.body.password);

  await getRepository(User).save(user);

  return res.status(201).send({ username: user.username });
});

router.post('/token', async (req, res) => {
  const user = await getRepository(User).findOne({
    where: { username: req.body.username }
  });

  if (!user) {
    return res.status(404).send();
  }

  const secret: string = process.env.JWT_SECRET!;

  if (!(await argon2.verify(user.password, req.body.password))) {
    return res.status(401).send();
  }

  const token = jwt.sign({ username: user.username }, secret, {
    expiresIn: '1d'
  });

  return res.send({ token });
});

export default router;
