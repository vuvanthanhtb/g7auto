export interface CarTransferResponse {
  id: number;
  carId: number;
  carName: string;
  fromShowroomId: number;
  fromShowroomName: string;
  toShowroomId: number;
  toShowroomName: string;
  status: string;
  note: string;
  transferDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CarTransferRequest {
  carId: number;
  fromShowroomId: number;
  toShowroomId: number;
  note?: string;
}

export interface CarTransferQuery {
  page?: number;
  size?: number;
  status?: string;
  showroomId?: number;
}
