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
  statusDisplay?: string;
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
type SelectOption = { label: string; value: string | number };

export interface CarSearchForm {
  status: SelectOption | null;
  showroom: SelectOption | null;
  carModel: SelectOption | null;
  licensePlate: string;
  page: number;
  size: number;
}

export interface CarQuery {
  status?: string;
  showroomId?: number;
  carModelId?: number;
  licensePlate?: string;
  page?: number;
  size?: number;
}
export interface CarImportResult {
  success: number;
  failed: number;
  errors: string[];
}

export interface CarCreateFormValues {
  chassisNumber: string;
  engineNumber: string;
  licensePlate: string;
  carModelId: SelectOption | null;
  showroomId: SelectOption | null;
  salePrice: string | number;
  notes: string;
}

export interface CarEditFormValues {
  licensePlate: string;
  showroomId: SelectOption | null;
  salePrice: string | number;
  status: SelectOption | null;
  notes: string;
}
