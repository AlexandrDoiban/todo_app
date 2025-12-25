import { QueryResult } from 'pg';
import { client } from '../../../db';
import { BadRequestError, NotFoundError } from '../../../errors';
import { validateUuid } from '../../../helpers';

export const deleteTaskService = async (args: {
  userId: string;
  taskId: string;
}): Promise<QueryResult<any>> => {
  const { userId, taskId } = args;

  const isValidUserId = validateUuid(userId);
  const isValidTaskId = validateUuid(taskId);

  if (!isValidUserId) {
    throw new BadRequestError('Invalid userId');
  }

  if (!isValidTaskId) {
    throw new BadRequestError('Invalid taskId');
  }

  if (!taskId) {
    throw new BadRequestError('TaskId is required');
  }

  const { rows: userExists } = await client.query(
    'SELECT id FROM users WHERE id = $1',
    [userId],
  );

  if (userExists.length === 0) {
    throw new NotFoundError('User not found');
  }

  const { rows: taskExists } = await client.query(
    'SELECT id FROM todos WHERE user_id = $1 AND id = $2',
    [userId, taskId],
  );

  if (taskExists.length === 0) {
    throw new NotFoundError('Task not found');
  }

  const insertQuery = `
    DELETE FROM todos
    WHERE user_id = $1 AND id = $2
    RETURNING id, title, description, completed, created_at
    `;

  return client.query(insertQuery, [userId, taskId]);
};
