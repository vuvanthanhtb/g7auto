export interface CarResponse {
  id: number;
  chassisNumber: string;
  engineNumber: string;
  licensePlate: string;
  carModelId: number;
  carModelName: string;
  showroomId: number;
  showroomName: string;
  status: string;
  salePrice: number;
  notes: string;
}
export interface CarRequest {
  chassisNumber: string;
  engineNumber: string;
  licensePlate?: string;
  carModelId: number;
  showroomId: number;
  salePrice?: number;
  notes?: string;
}
export interface CarUpdateRequest {
  licensePlate?: string;
  showroomId?: number;
  salePrice?: number;
  status?: string;
  notes?: string;
}
export interface CarQuery { status?: string; showroomId?: number; carModelId?: number; page?: number; size?: number; }
