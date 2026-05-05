import type { TablePagination } from "@/libs/types";

export interface EmployeeListSearchForm {
  fullName?: string;
  employeeStatus?: Record<string, string>;
  page?: number;
  size?: number;
}

export interface EmployeeListSearchQuery {
  fullName?: string;
  employeeStatus?: string;
  page?: number;
  size?: number;
}

export type EmployeeListPage = TablePagination<Record<string, unknown>>;
