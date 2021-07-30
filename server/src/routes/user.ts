import { hash } from 'argon2';
import { Router } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

const router = Router();

router.post('/', async (req, res) => {
  const user = new User();
  user.username = req.body.username;
  user.password = await hash(req.body.password);

  await getRepository(User).save(user);

  return res.status(201).send({ username: user.username });
});

export default router;
