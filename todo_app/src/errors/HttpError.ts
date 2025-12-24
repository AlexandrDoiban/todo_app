// src/errors/HttpError.ts
export abstract class HttpError extends Error {
  abstract statusCode: number;
  details?: unknown;

  constructor(message: string, details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.details = details;
  }
}
