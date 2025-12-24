// src/errors/NotFoundError.ts
import { HttpError } from './HttpError';

export class NotFoundError extends HttpError {
  statusCode = 204;
}
