import argon2 from 'argon2';
import { Router } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import validate from '../validation/middleware';
import { userValidator } from '../validation/validators';
import auth from '../middleware/auth';

const router = Router();

router.post('/', validate(userValidator), async (req, res) => {
  const user = new User();
  user.username = req.body.username;
  user.password = await argon2.hash(req.body.password);

  const repo = getRepository(User);

  if (await repo.findOne({ where: { username: user.username } })) {
    return res.status(409).send();
  }

  await repo.save(user);

  return res.status(201).send({
    id: user.id,
    username: user.username
  });
});

router.post('/token', validate(userValidator), async (req, res) => {
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

  const payload = { userId: user.id, username: user.username };
  const token = jwt.sign(payload, secret, {
    expiresIn: '1d'
  });

  return res.send({ token });
});

router.get('/', auth, async (req, res) => {
  const { username, id } = req.user! as User;

  return res.send({ id, username });
});

export default router;
