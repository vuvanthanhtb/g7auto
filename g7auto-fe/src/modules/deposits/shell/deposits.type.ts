export interface DepositResponse {
  id: number;
  quotationId: number;
  customerId: number;
  customerFullName: string;
  carId: number;
  carChassisNumber: string;
  employeeId: number;
  employeeFullName: string;
  amount: number;
  depositDate: string;
  expiryDate: string;
  paymentMethod: string;
  status: string;
  notes: string;
  createdAt: string;
}

export interface DepositRequest {
  quotationId?: number;
  customerId: number;
  carId: number;
  employeeId?: number;
  amount: number;
  depositDate: string;
  expiryDate?: string;
  depositPaymentMethod: string;
  notes?: string;
}

export interface DepositSearchForm {
  status: string;
  page: number;
  size: number;
}

export interface DepositPayload {
  status?: string;
  page?: number;
  size?: number;
}
