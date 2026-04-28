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
  accountId: number;
  employeeStatus: string;
}
export interface EmployeeRequest {
  fullName: string;
  phone: string;
  email?: string;
  address?: string;
  birthDate?: string;
  gender?: string;
  nationalId: string;
  joinDate?: string;
  showroomId: number;
  accountId?: number;
}
export interface EmployeeQuery {
  fullName?: string;
  showroomId?: number;
  employeeStatus?: string;
  page?: number;
  size?: number;
}
