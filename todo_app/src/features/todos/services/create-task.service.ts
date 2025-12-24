import { client } from '../../../db';
import { ConflictError, NotFoundError } from '../../../errors';
import { CreateTaskDto } from '../dto';

export const createTaskService = async (data: CreateTaskDto) => {
  const { userId, title, description } = data;

  const { rows: userExists } = await client.query(
    'SELECT id FROM users WHERE id = $1',
    [userId],
  );

  if (userExists.length === 0) {
    throw new NotFoundError('User not found');
  }

  const { rows: titleExists } = await client.query(
    'SELECT title FROM todos WHERE user_id = $1 AND title = $2',
    [userId, title],
  );

  if (titleExists.length > 0) {
    throw new ConflictError('Title duplication. Use another title please.');
  }

  const insertQuery = `
    INSERT INTO todos (user_id, title, description)
    VALUES ($1, $2, $3)
    RETURNING id, title, description
    `;
  const { rows: task } = await client.query(insertQuery, [
    userId,
    title,
    description,
  ]);
  return task[0];
};
