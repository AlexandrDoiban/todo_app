// src/errors/GlobalError.ts
import { ErrorRequestHandler } from 'express';
import { HttpError } from '../errors/HttpError';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next,
) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: err.message,
      details: err.details,
    });
  }

  console.error(err);
  return res.status(500).json({ error: 'Server error' });
};
