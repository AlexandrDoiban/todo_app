import { client } from '../../../db';
import { BadRequestError, ConflictError, NotFoundError } from '../../../errors';
import { validateUuid } from '../../../helpers';
import { TaskListResponseDto, TaskListRowsDto } from '../dto';
import { CreateUserBody, UserResponseDto } from '../dto/user.dto';

export const createUserService = async (
  data: CreateUserBody,
): Promise<UserResponseDto> => {
  const { email, password } = data;

  if (!email || !password) {
    throw new BadRequestError('Email and password are required');
  }

  const { rows: userExisting } = await client.query(
    'SELECT id FROM users WHERE email = $1',
    [email],
  );

  if (userExisting.length > 0) {
    throw new ConflictError('User with this email already exists');
  }

  const insertQuery = `
    INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING id, email, created_at;
  `;

  const { rows } = await client.query(insertQuery, [email, password]);
  return rows[0];
};

export const deleteUserService = async ({ userId }: { userId: string }) => {
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

  const { rows: deleted } = await client.query(
    'DELETE FROM users WHERE id = $1 RETURNING *',
    [userId],
  );

  return deleted[0];
};

export const getUserTodoListService = async (
  userId: string,
): Promise<Array<TaskListResponseDto>> => {
  const isValidUserId = validateUuid(userId);

  if (!isValidUserId) {
    throw new BadRequestError('Invalid userId');
  }

  const { rows: userRow } = await client.query(
    'SELECT id FROM users WHERE id = $1',
    [userId],
  );

  if (userRow.length === 0) {
    throw new NotFoundError('User not found');
  }

  const { rows: list } = await client.query<TaskListRowsDto>(
    `SELECT id, title, description, completed, created_at
    FROM todos
    WHERE user_id = $1`,
    [userId],
  );

  return list.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    completed: item.completed,
    createdAt: item.created_at,
  }));
};
