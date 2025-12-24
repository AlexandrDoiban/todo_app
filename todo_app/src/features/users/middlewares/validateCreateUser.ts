// src/middleware/validateCreateUserRequest.ts
import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, z } from 'zod';
import { CreateUserBody } from '../dto/user.dto';
import { BadRequestError } from '../../../errors';

export const validateCreateUser =
  <T extends ZodTypeAny<CreateUserBody>>(schema: T) =>
  (
    req: Request<{}, {}, CreateUserBody>,
    _res: Response,
    next: NextFunction,
  ) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new BadRequestError('Validation failed', result.error.issues),
      );
    }

    req.body = result.data;
    next();
  };
