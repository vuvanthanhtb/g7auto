export interface EmployeeResponse {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  birthDate: string;
  gender: string;
  nationalId: string;
  joinDate: string;
  showroomId: number;
  showroomName: string;
  username: string;
  employeeStatus: string;
  action?: string;
  statusApproving?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeRequest {
  fullName: string;
  phone: string;
  email?: string;
  address?: string;
  birthDate?: string;
  gender?: string;
  nationalId?: string;
  joinDate?: string;
  showroomId: number;
  username?: string;
}

export interface EmployeeQuery {
  fullName?: string;
  showroomId?: number;
  employeeStatus?: string;
  page?: number;
  size?: number;
}

export interface EmployeeImportResult {
  total: number;
  success: number;
  failed: number;
  errors: string[];
}

export interface EmployeeApprovingQuery {
  fullName?: string;
  showroomId?: number;
  action?: string;
  statusApproving?: string | string[];
  page?: number;
  size?: number;
}
