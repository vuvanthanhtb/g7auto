export interface PaymentResponse {
  id: number;
  code: string;
  contractId: number;
  contractCode: string;
  customerId: number;
  customerName: string;
  amount: number;
  paymentMethod: string;
  status: string;
  paymentTime: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRequest {
  contractId: number;
  amount: number;
  paymentMethod: string;
  paymentTime?: string;
  note?: string;
}

export interface PaymentQuery {
  page?: number;
  size?: number;
  status?: string;
  contractId?: number;
  customerId?: number;
}
