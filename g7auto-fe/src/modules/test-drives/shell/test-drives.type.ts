export interface TestDriveResponse {
  id: number;
  customerId: number;
  customerFullName: string;
  carId: number;
  carChassisNumber: string;
  employeeId: number;
  employeeFullName: string;
  showroomId: number;
  showroomName: string;
  startTime: string;
  endTime: string;
  status: string;
  notes: string;
  createdAt: string;
}

export interface TestDriveRequest {
  customerId: number;
  carId: number;
  employeeId?: number;
  showroomId?: number;
  startTime: string;
  endTime: string;
  notes?: string;
}

export interface TestDriveSearchForm {
  status: string;
  page: number;
  size: number;
}

export interface TestDrivePayload {
  status?: string;
  customerId?: number;
  showroomId?: number;
  page?: number;
  size?: number;
}

export interface TestDriveCreateFormValues {
  customerId: string | number;
  carId: string | number;
  showroomId: string | number;
  employeeId: string | number;
  startTime: string;
  endTime: string;
  notes: string;
}

export interface TestDriveDetailFormValues {
  notes: string;
}
