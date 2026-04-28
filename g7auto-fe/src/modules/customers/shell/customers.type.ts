export interface CustomerResponse {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  birthDate: string;
  nationalId: string;
  sourceType: string;
  carInterest: string;
  assignedEmployeeId: number;
  assignedEmployeeName: string;
  notes: string;
}
export interface CustomerRequest {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  birthDate?: string;
  nationalId?: string;
  sourceType?: string;
  carInterest?: string;
  assignedEmployeeId?: number;
  notes?: string;
}
export interface CustomerQuery { fullName?: string; phone?: string; page?: number; size?: number; }
