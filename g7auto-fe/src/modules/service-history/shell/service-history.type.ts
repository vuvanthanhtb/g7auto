export interface ServiceHistoryResponse {
  id: number;
  carId: number;
  carName: string;
  customerId: number;
  customerName: string;
  showroomId: number;
  showroomName: string;
  employeeId: number;
  employeeName: string;
  serviceType: string;
  description: string;
  cost: number;
  serviceDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceHistoryRequest {
  carId: number;
  customerId?: number;
  showroomId: number;
  employeeId: number;
  serviceType: string;
  description?: string;
  cost?: number;
  serviceDate?: string;
}

export interface ServiceHistoryQuery {
  page?: number;
  size?: number;
  carId?: number;
  customerId?: number;
  showroomId?: number;
}
