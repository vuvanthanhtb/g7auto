export interface ShowroomResponse {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  managerId: number;
  managerName: string;
  status: string;
}
export interface ShowroomRequest {
  name: string;
  address: string;
  phone: string;
  email: string;
  managerId?: number;
}
export interface ShowroomSearchForm {
  name: string;
  phone: string;
  fromDate: Date | null | string;
  toDate: Date | null | string;
  page: number;
  size: number;
}

export interface ShowroomPayload {
  name?: string;
  phone?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  size?: number;
}

export interface ShowroomExportPayload {
  name?: string;
  phone?: string;
  fromDate?: string;
  toDate?: string;
}

type SelectOption = { label: string; value: string | number };

export interface ShowroomFormValues {
  name: string;
  address: string;
  phone: string;
  email: string;
  managerId: SelectOption | null;
}
