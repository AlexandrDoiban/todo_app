export interface CreateUserBody {
  email: string;
  password: string;
}

export interface UserResponseDto {
  id: number;
  email: string;
  created_at: string;
}
