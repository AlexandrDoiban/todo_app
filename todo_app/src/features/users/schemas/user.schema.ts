import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.email({ message: 'Incorrect email' }),
  password: z.string().min(6, { message: 'Password must 6 chars length' }),
});
