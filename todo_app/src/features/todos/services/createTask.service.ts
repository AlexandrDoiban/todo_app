import { client } from '../../../db';
import { BadRequestError, ConflictError, NotFoundError } from '../../../errors';
import { validateUuid } from '../../../helpers';
import {
  CreateTaskRequestDto,
  CreateTaskResponseDto,
  CreateTaskRowsDto,
} from '../dto';

export const createTaskService = async (
  data: CreateTaskRequestDto,
): Promise<CreateTaskResponseDto> => {
  const { userId, title, description } = data;

  const isValidUserId = validateUuid(userId);

  if (!isValidUserId) {
    throw new BadRequestError('Invalid userId');
  }

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
  const {
    rows: [task],
  } = await client.query<CreateTaskRowsDto>(insertQuery, [
    userId,
    title,
    description,
  ]);

  return {
    ...task,
    createdAt: task.created_at,
  };
};
