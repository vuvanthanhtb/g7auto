export interface ContractResponse {
  id: number;
  contractNumber: string;
  customerId: number;
  customerFullName: string;
  carId: number;
  carChassisNumber: string;
  employeeId: number;
  employeeFullName: string;
  signDate: string;
  expectedDeliveryDate: string;
  actualDeliveryDate: string;
  contractValue: number;
  paidAmount: number;
  remainingAmount: number;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContractRequest {
  customerId: number;
  carId: number;
  employeeId?: number;
  depositId?: number;
  signDate: string;
  expectedDeliveryDate?: string;
  contractValue: number;
  notes?: string;
}

export interface ContractUpdateRequest {
  actualDeliveryDate?: string;
  status?: string;
  notes?: string;
}

export interface ContractSearchForm {
  status: string;
  page: number;
  size: number;
}

export interface ContractPayload {
  status?: string;
  page?: number;
  size?: number;
}

type SelectOption = { label: string; value: string | number };

export interface ContractCreateFormValues {
  customerId: SelectOption | null;
  carId: SelectOption | null;
  employeeId: SelectOption | null;
  depositId: SelectOption | null;
  signDate: string;
  expectedDeliveryDate: string;
  contractValue: string | number;
  notes: string;
}

export interface ContractUpdateFormValues {
  actualDeliveryDate: string;
  status: SelectOption | null;
  notes: string;
}
