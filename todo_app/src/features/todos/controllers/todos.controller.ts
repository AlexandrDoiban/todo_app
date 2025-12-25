import { Response, Request } from 'express';
import {
  CreateTaskRequestDto,
  CreateTaskResponseDto,
  DeleteTaskRequestBodyDto,
  EditTaskPatchDto,
  EditTaskRequestBodyDto,
} from '../dto';
import { createTaskService, editTaskService } from '../services';
import { deleteTaskService } from '../services';

export const createTaskController = async (
  req: Request<{}, {}, CreateTaskRequestDto>,
  res: Response<CreateTaskResponseDto>,
) => {
  const task = await createTaskService(req.body);
  return res.status(201).json(task);
};

export const deleteTaskController = async (
  req: Request<{ id: string }, {}, DeleteTaskRequestBodyDto>,
  res: Response,
) => {
  await deleteTaskService({
    taskId: req.body.taskId,
    userId: req.params.id,
  });

  return res.sendStatus(204);
};

export const editTaskController = async (
  req: Request<{ id: string }, {}, EditTaskPatchDto>,
  res: Response,
) => {
  const task = await editTaskService({
    userId: req.params.id,
    task: req.body,
  });

  return res.status(200).json({ task });
};
