export interface QuotationResponse {
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
  quotedPrice: number;
  status: string;
  validDate: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuotationRequest {
  customerId: number;
  carId: number;
  showroomId: number;
  employeeId: number;
  quotedPrice: number;
  validDate?: string;
  note?: string;
}

export interface QuotationQuery {
  page?: number;
  size?: number;
  status?: string;
  customerId?: number;
}
