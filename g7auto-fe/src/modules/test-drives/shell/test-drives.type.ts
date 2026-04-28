export interface TestDriveResponse {
  id: number;
  customerId: number;
  customerName: string;
  carId: number;
  carName: string;
  showroomId: number;
  showroomName: string;
  employeeId: number;
  employeeName: string;
  status: string;
  startTime: string;
  endTime: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface TestDriveRequest {
  customerId: number;
  carId: number;
  showroomId: number;
  employeeId: number;
  startTime: string;
  endTime?: string;
  note?: string;
}

export interface TestDriveQuery {
  page?: number;
  size?: number;
  status?: string;
  customerId?: number;
  showroomId?: number;
}
