export interface CreateTaskRequestDto {
  userId: string;
  title: string;
  description: string;
}

export interface CreateTaskRowsDto {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

export interface CreateTaskResponseDto {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}
