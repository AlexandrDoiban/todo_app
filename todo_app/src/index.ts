import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './db';
import { userModule } from './features/users';
import { globalErrorHandler } from './middlewares/globalErrorHandler';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userModule);

// Global error handler should be registered last
// so that it can catch errors thrown by any route or middleware
app.use(globalErrorHandler);

connectDB()
  .then(() => {
    console.log('DB ready');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

export default app;
