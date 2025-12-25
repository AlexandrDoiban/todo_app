import { z } from 'zod';

export const createTaskSchema = z.object({
  userId: z.string().nonempty('UserId is required'),
  title: z.string().min(1, { message: 'Title must be 1 chars length' }),
  description: z
    .string()
    .min(1, { message: 'Description must be 1 chars length' }),
});
