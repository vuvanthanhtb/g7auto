import type { TablePagination } from "@/libs/types";
import type { EmployeeResponse } from "@/modules/employees/shell/employees.type";

export interface EmployeePendingSearchForm {
  fullName?: string;
  page?: number;
  size?: number;
}

export interface EmployeePendingSearchQuery {
  fullName?: string;
  statusApproving?: string;
  page?: number;
  size?: number;
}

export interface EmployeePending extends EmployeeResponse {
  actionDisplay: string;
}

export type EmployeePendingPage = TablePagination<EmployeePending>;
