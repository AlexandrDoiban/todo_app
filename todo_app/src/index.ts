import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './db';
import userModule from './features/users/user.module';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userModule);

connectDB()
  .then(() => {
    console.log('DB ready');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

export default app;
