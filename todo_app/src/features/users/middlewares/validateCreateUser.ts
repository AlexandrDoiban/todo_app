// src/middleware/validateCreateUserRequest.ts
import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, z } from 'zod';
import { CreateUserBody } from '../dto/user.dto';

export const validateCreateUser = <T extends ZodTypeAny<CreateUserBody>>(
  schema: T,
) => {
  return (
    req: Request<{}, {}, CreateUserBody>,
    res: Response,
    next: NextFunction,
  ) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: result.error.issues,
      });
    }
    req.body = result.data;
    next();
  };
};
