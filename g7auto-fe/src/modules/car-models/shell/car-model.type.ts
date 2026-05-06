import type { TablePagination } from "@/libs/types";

export interface CarModelSearchForm {
  page?: number;
  size?: number;
  name?: string;
  manufacturer?: string;
  fromDate?: string;
  toDate?: string;
}

export interface CarModelTable {
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

export type CarModelPage = TablePagination<CarModelTable>;
