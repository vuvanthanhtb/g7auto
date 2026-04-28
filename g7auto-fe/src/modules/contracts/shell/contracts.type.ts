export interface ContractResponse {
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
  salePrice: number;
  depositAmount: number;
  remainingAmount: number;
  status: string;
  signDate: string;
  deliveryDate: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContractRequest {
  customerId: number;
  carId: number;
  showroomId: number;
  employeeId: number;
  salePrice: number;
  depositAmount?: number;
  signDate?: string;
  deliveryDate?: string;
  note?: string;
}

export interface ContractQuery {
  page?: number;
  size?: number;
  status?: string;
  customerId?: number;
  carId?: number;
}
