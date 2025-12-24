// src/errors/ConflictError.ts
import { HttpError } from './HttpError';

export class ConflictError extends HttpError {
  statusCode = 409;
}
