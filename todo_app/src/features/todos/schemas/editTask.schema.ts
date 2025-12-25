// features/todos/schemas/editTask.schema.ts
import { z } from 'zod';

export const editTaskSchema = z
  .object({
    taskId: z.uuid('Invalid taskId format'),
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    completed: z.boolean().optional(),
  })
  .refine(
    (data) =>
      data.title !== undefined ||
      data.description !== undefined ||
      data.completed !== undefined,
    {
      message: 'At least one field must be provided for update',
    },
  );
