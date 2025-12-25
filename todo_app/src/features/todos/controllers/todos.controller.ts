import { Response, Request } from 'express';
import {
  CompleteTaskRequestBodyDto,
  CreateTaskRequestDto,
  CreateTaskResponseDto,
  DeleteTaskRequestBodyDto,
  EditTaskPatchDto,
  EditTaskRequestBodyDto,
  GetTasksQueryDto,
} from '../dto';
import {
  completeTaskService,
  createTaskService,
  editTaskService,
  getAllTasksService,
} from '../services';
import { deleteTaskService } from '../services';
import { getTasksQuerySchema } from '../schemas';

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

export const toggleTaskCompleteController = async (
  req: Request<{ id: string }, {}, CompleteTaskRequestBodyDto>,
  res: Response,
) => {
  const task = await completeTaskService({
    userId: req.params.id,
    task: req.body,
  });

  return res.status(200).json({ task });
};

export const getAllTasksController = async (
  req: Request<{}, {}, {}, GetTasksQueryDto>,
  res: Response,
) => {
  const query = getTasksQuerySchema.parse(req.query);
  const task = await getAllTasksService(query);
  return res.status(200).json({ task });
};
