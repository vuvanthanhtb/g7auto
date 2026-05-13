export interface CarTransferResponse {
  id: number;
  carId: number;
  carChassisNumber: string;
  fromShowroomId: number;
  fromShowroomName: string;
  toShowroomId: number;
  toShowroomName: string;
  createdByEmployeeId: number;
  transferDate: string;
  expectedReceiveDate: string;
  actualReceiveDate: string;
  status: string;
  statusDisplay?: string;
  reason: string;
  notes: string;
  createdAt: string;
}

export interface CarTransferRequest {
  carId: number;
  fromShowroomId: number;
  toShowroomId: number;
  expectedReceiveDate?: string;
  reason: string;
  notes?: string;
}

export interface CarTransferQuery {
  page?: number;
  size?: number;
  status?: string;
  showroomId?: number;
}

export interface CarTransferSearchForm {
  status: { label: string; value: string };
  page: number;
  size: number;
}

export interface CarTransferSearchQuery {
  status?: string;
  page: number;
  size: number;
}

type SelectOption = { label: string; value: string | number };

export interface CarTransferCreateFormValues {
  carId: SelectOption | null;
  fromShowroomId: SelectOption | null;
  toShowroomId: SelectOption | null;
  reason: string;
  expectedReceiveDate: string;
  notes: string;
}
