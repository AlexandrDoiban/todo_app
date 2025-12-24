import { client } from '../../../db';
import { BadRequestError, ConflictError, NotFoundError } from '../../../errors';
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
