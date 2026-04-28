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
export interface CarModelQuery { name?: string; manufacturer?: string; page?: number; size?: number; }
