export interface AccountResponse {
  id: number;
  username: string;
  email: string;
  fullName: string;
  roles: string;
  status: string;
  showroomId: number;
  showroomName: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccountRequest {
  username: string;
  email?: string;
  fullName?: string;
  password?: string;
  role: string;
  showroomId?: number;
}
