export interface ShowroomResponse {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  status: string;
}
export interface ShowroomRequest {
  name: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
}
export interface ShowroomQuery { name?: string; page?: number; size?: number; }
