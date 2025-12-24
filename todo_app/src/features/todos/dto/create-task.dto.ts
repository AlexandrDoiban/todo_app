export interface CreateTaskDto {
  userId: string;
  title: string;
  description: string;
}

export interface TaskResponseDto {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
