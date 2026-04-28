export interface DepositResponse {
  id: number;
  code: string;
  customerId: number;
  customerName: string;
  carId: number;
  carName: string;
  showroomId: number;
  showroomName: string;
  employeeId: number;
  employeeName: string;
  amount: number;
  status: string;
  depositDate: string;
  expiredDate: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface DepositRequest {
  customerId: number;
  carId: number;
  showroomId: number;
  employeeId: number;
  amount: number;
  depositDate?: string;
  expiredDate?: string;
  note?: string;
}

export interface DepositQuery {
  page?: number;
  size?: number;
  status?: string;
  customerId?: number;
}
