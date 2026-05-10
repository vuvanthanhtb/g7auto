import type { TablePagination } from "@/libs/types";
import type { EmployeeResponse } from "@/modules/employees/shell/employees.type";

export interface EmployeeApprovedSearchForm {
  fullName?: string;
  page?: number;
  size?: number;
}

export interface EmployeeApprovedSearchQuery {
  fullName?: string;
  statusApproving?: string;
  page?: number;
  size?: number;
}

export interface EmployeeApproved extends EmployeeResponse {
  statusApprovingDisplay: string;
  employeeStatusDisplay: string;
}

export type EmployeeApprovedPage = TablePagination<EmployeeApproved>;
