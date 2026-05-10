export interface CustomerResponse {
  id: number;
  fullName: string;
  phone: string;
  phoneDisplay?: string;
  email: string;
  address: string;
  birthDate: string;
  nationalId: string;
  sourceType: string;
  carInterest: string;
  assignedEmployeeId: number;
  assignedEmployeeName: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerFormValues {
  fullName: string;
  phone: string;
  email: string;
  nationalId: string;
  address: string;
  birthDate: string;
  sourceType: string;
  carInterest: string;
  notes: string;
}

export interface CustomerSearchForm {
  fullName: string;
  phone: string;
  email: string;
  nationalId: string;
  fromDate: Date | null | string;
  toDate: Date | null | string;
  page: number;
  size: number;
}

export interface CustomerRequest {
  fullName: string;
  phone: string;
  email?: string;
  address?: string;
  birthDate?: string;
  nationalId?: string;
  sourceType?: string;
  carInterest?: string;
  assignedEmployeeId?: number;
  notes?: string;
}

export interface CustomerPayload {
  fullName: string;
  phone: string;
  email: string;
  nationalId: string;
  fromDate: string;
  toDate: string;
  page?: number;
  size?: number;
}

export interface CustomerExportPayload {
  fullName: string;
  phone: string;
  email: string;
  nationalId: string;
  fromDate: string;
  toDate: string;
}
