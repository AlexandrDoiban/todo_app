import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './db';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { userRoute } from './features/users/routes';
import { todosRouter } from './features/todos';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const API = process.env.API;

app.use(`${API}/user`, userRoute);
app.use(`${API}/todos`, todosRouter);

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
