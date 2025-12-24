export interface TaskListResponseDto {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export interface TaskListRowsDto {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}
