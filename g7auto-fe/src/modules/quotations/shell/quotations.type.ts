export interface QuotationResponse {
  id: number;
  customerId: number;
  customerFullName: string;
  carId: number;
  carChassisNumber: string;
  employeeId: number;
  employeeFullName: string;
  carPrice: number;
  accessories: number;
  promotion: number;
  otherCosts: number;
  totalAmount: number;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuotationRequest {
  customerId: number;
  carId: number;
  employeeId?: number;
  carPrice?: number;
  accessories?: number;
  promotion?: number;
  otherCosts?: number;
  notes?: string;
}

export interface QuotationSearchForm {
  status: string;
  page: number;
  size: number;
}

export interface QuotationPayload {
  status?: string;
  customerId?: number;
  page?: number;
  size?: number;
}
