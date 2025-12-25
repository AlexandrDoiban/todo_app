import { z } from 'zod';
import { getTasksQuerySchema } from "../schemas";

export type GetTasksQueryDto = z.infer<typeof getTasksQuerySchema>;
