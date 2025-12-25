// features/todos/dto/editTaskPatch.dto.ts
import { z } from 'zod';
import { editTaskSchema } from '../schemas/editTask.schema';

export type EditTaskPatchDto = z.infer<typeof editTaskSchema>;

export interface EditTaskRequestBodyDto {
  taskId: string;
  title: string;
  description: string;
  completed: string;
}
