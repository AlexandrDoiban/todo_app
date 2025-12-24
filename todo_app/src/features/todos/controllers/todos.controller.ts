import { Response, Request } from 'express';
import { CreateTaskDto } from '../dto';
import { createTaskService } from '../services';

export const createTaskController = async (
  req: Request<{}, {}, CreateTaskDto>,
  res: Response,
) => {
  const task = await createTaskService(req.body);
  return res.status(201).json({ task });
};
