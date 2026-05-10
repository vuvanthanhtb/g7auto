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
