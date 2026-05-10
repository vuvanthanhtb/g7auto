export interface ServiceHistoryResponse {
  id: number;
  customerId: number;
  customerFullName: string;
  employeeId: number;
  employeeFullName: string;
  serviceDate: string;
  contactType: string;
  content: string;
  result: string;
  nextReminderDate: string;
  createdAt: string;
}

export interface ServiceHistoryRequest {
  customerId: number;
  employeeId?: number;
  serviceDate: string;
  contactType: string;
  content?: string;
  result?: string;
  nextReminderDate?: string;
}

export interface ServiceHistorySearchForm {
  page: number;
  size: number;
}

export interface ServiceHistoryPayload {
  customerId?: number;
  page?: number;
  size?: number;
}
