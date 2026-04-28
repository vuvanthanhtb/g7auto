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

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface AccountQuery {
  page?: number;
  size?: number;
  username?: string;
  email?: string;
  status?: string;
  role?: string;
}

export interface UserApproveResponse {
  id: string;
  userId: string;
  username: string;
  email: string;
  fullName: string;
  roles: string[];
  action: string;
  status: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface UserApproveQuery {
  page?: number;
  size?: number;
  action?: string;
  status?: string;
  createdBy?: string;
  fromDate?: string;
  toDate?: string;
}

export interface AccountPage {
  content: AccountTableResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

export interface UserApprovePage {
  content: UserApproveResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

export interface ImportResult {
  total: number;
  success: number;
  failed: number;
  errors: string[];
}

export interface AccountTableResponse {
  id: number;
  username: string;
  email: string;
  fullName: string;
  roles: string[];
  status: string;
  showroomId: number;
  showroomName: string;
  createdAt: string;
  updatedAt: string;
}
