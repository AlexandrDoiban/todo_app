import { client } from '../../../db';
import { CreateUserBody, UserResponseDto } from '../dto/user.dto';

export const createUserService = async (
  data: CreateUserBody,
): Promise<UserResponseDto> => {
  const { email, password } = data;

  const { rows: userExisting } = await client.query(
    'SELECT id FROM users WHERE email = $1',
    [email],
  );

  if (userExisting.length > 0) {
    throw new Error('User with this email already exists');
  }

  const insertQuery = `
    INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING id, email, created_at;
  `;
  const values = [email, password];
  const { rows } = await client.query(insertQuery, values);

  return rows[0];
};
