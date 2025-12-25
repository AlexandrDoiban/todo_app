// src/middleware/validateCreateUserRequest.ts
import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, z } from 'zod';
import { BadRequestError } from '../../../errors';
import { CreateTaskRequestDto } from '../dto';

export const validateCreateTask =
  <T extends ZodTypeAny<CreateTaskRequestDto>>(schema: T) =>
  (
    req: Request<{}, {}, CreateTaskRequestDto>,
    _res: Response,
    next: NextFunction,
  ) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new BadRequestError(
          'Validation failed',
          result.error.issues[0].message,
        ),
      );
    }

    req.body = result.data;
    next();
  };
