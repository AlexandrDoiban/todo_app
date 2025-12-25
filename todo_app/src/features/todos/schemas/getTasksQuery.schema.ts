import { z } from 'zod';

export const getTasksQuerySchema = z.object({
  userId: z.uuid('UserId invalid'),
  from: z.string().optional(), // ISO date string
  to: z.string().optional(),   // ISO date string
  completed: z
    .string()
    .optional()
    .transform((val) => (val === undefined ? undefined : val === 'true')),
});
