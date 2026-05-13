export interface PaymentResponse {
  id: number;
  contractId: number;
  contractNumber: string;
  installmentNumber: number;
  amount: number;
  paymentTime: string;
  method: string;
  status: string;
  collectorId: number;
  collectorName: string;
  transactionCode: string;
  notes: string;
  createdAt: string;
}

export interface PaymentRequest {
  contractId: number;
  amount: number;
  method: string;
  paymentTime?: string;
  collectorId?: number;
  transactionCode?: string;
  notes?: string;
}

export interface PaymentSearchForm {
  status: string;
  page: number;
  size: number;
}

export interface PaymentPayload {
  status?: string;
  contractId?: number;
  page?: number;
  size?: number;
}

type SelectOption = { label: string; value: string | number };

export interface PaymentCreateFormValues {
  contractId: SelectOption | null;
  amount: string | number;
  method: SelectOption | null;
  bankId: SelectOption | null;
  bankAccountNo: string;
  bankContent: string;
  paymentTime: string;
  collectorId: string | number;
  transactionCode: string;
  notes: string;
}

export interface PaymentDetailFormValues {
  notes: string;
}
