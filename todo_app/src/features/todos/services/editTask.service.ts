import { client } from '../../../db';
import { BadRequestError, NotFoundError } from '../../../errors';
import { EditTaskPatchDto } from '../dto';

export const editTaskService = async ({
  userId,
  task,
}: {
  userId: string;
  task: EditTaskPatchDto;
}) => {
  const { taskId, title, description, completed } = task;

  if (!title && !description && completed === undefined) {
    throw new BadRequestError('No fields to update');
  }

  const query = `
  UPDATE todos
  SET
    title = COALESCE($1, title),
    description = COALESCE($2, description),
    completed = COALESCE($3, completed),
    updated_at = NOW()
  WHERE id = $4 AND user_id = $5
  RETURNING id, title, description, completed, created_at, updated_at`;

  const { rows } = await client.query(query, [
    title ?? null,
    description ?? null,
    completed ?? null,
    taskId,
    userId,
  ]);

  if (rows.length === 0) {
    throw new NotFoundError('Task not found');
  }

  return rows[0];
};
