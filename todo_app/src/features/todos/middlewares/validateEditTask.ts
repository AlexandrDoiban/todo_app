// middlewares/validate.ts
import { ZodTypeAny } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../../errors';

export const validateEditTask =
  <T extends ZodTypeAny>(schema: T) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new BadRequestError('Validation failed', result.error.issues),
      );
    }

    req.body = result.data;
    next();
  };
