import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { HttpError } from '../errors/HttpError';

export const globalErrorHandler: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: err.message,
      details: err.details,
    });
  }

  return res.status(500).json({ error: 'Server error' });
};
