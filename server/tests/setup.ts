import { createConnection } from 'typeorm';

export default async () => {
  await createConnection({
    type: 'sqlite',
    database: ':memory:',
    entities: ['../src/models/*.ts'],
    synchronize: true
  });
};
