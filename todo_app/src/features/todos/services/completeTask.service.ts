import { client } from '../../../db';
import { BadRequestError, NotFoundError } from '../../../errors';
import { validateUuid } from '../../../helpers';
import { CompleteTaskRequestBodyDto } from '../dto';

export const completeTaskService = async ({
  userId,
  task,
}: {
  userId: string;
  task: CompleteTaskRequestBodyDto;
}) => {
  console.log(1);
  const { taskId, completed } = task;

  console.log(2);
  if (!validateUuid(taskId)) {
    throw new BadRequestError('TaskId invalid');
  }
  console.log(3);

  if (completed === undefined) {
    throw new BadRequestError('Field "Completed" is required');
  }
  console.log(4);

  const query = `
  UPDATE todos
  SET
  completed = $1,
  updated_at = NOW()
  WHERE id = $2 AND user_id = $3
  RETURNING id, title, description, completed, created_at, updated_at`;

  console.log(5);
  const { rows } = await client.query(query, [completed, taskId, userId]);
  console.log(6);

  if (rows.length === 0) {
    throw new NotFoundError('Task not found');
  }
  console.log(7);

  return rows[0];
};
