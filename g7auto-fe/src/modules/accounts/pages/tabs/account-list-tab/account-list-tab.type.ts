export interface AccountTableResponse {
  id: number;
  username: string;
  email: string;
  fullName: string;
  roles: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface AccountQuery {
  page?: number;
  size?: number;
  username?: string;
  fullName?: string;
  status?: Record<string, string>;
  role?: Record<string, string>;
}

export interface AccountPage {
  content: AccountTableResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
