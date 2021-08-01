import { createConnection } from 'typeorm';
import dbConfig from './config/db';
import app from './server';

const port = process.env.PORT ?? 8000;

createConnection(dbConfig)
  .then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch(console.error);
