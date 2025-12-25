import { client } from '../../../db';
import {
  GetTasksQueryDto,
} from '../dto';

export const getAllTasksService = async (query: GetTasksQueryDto) => {
  const { userId, from, to, completed } = query;

  const conditions = ['user_id = $1'];
  const values: any[] = [userId];
  let idx = 2;

  if (completed !== undefined) {
    conditions.push(`completed = $${idx++}`);
    values.push(completed);
  }

  if (from) {
    conditions.push(`created_at >= $${idx++}`);
    values.push(from);
  }

  if (to) {
    conditions.push(`created_at <= $${idx++}`);
    values.push(to);
  }

  const queryStr = `
    SELECT id, title, description, completed, created_at, updated_at
    FROM todos
    WHERE ${conditions.join(' AND ')}
    ORDER BY created_at DESC
  `;

  const { rows } = await client.query(queryStr, values);

  return rows;
};

