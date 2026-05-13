export interface CarModelResponse {
  id: number;
  name: string;
  manufacturer: string;
  series: string;
  year: string;
  color: string;
  carType: string;
  engine: string;
  transmission: string;
  listedPrice: number;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CarModelRequest {
  name: string;
  manufacturer?: string;
  series?: string;
  year?: string;
  color?: string;
  carType?: string;
  engine?: string;
  transmission?: string;
  listedPrice?: number;
  description?: string;
}

export interface CarModelSearchForm {
  name: string;
  manufacturer: string;
  year: string;
  page: number;
  size: number;
}

export interface CarModelPayload {
  name?: string;
  manufacturer?: string;
  year?: string;
  page?: number;
  size?: number;
}

export interface CarModelExportPayload {
  name?: string;
  manufacturer?: string;
  year?: string;
}

export interface CarModelFormValues {
  name: string;
  manufacturer: string;
  year: string | number;
  listedPrice: string | number;
  description: string;
}
