import {
  PAGE_CURRENT,
  PAGE_SIZE,
  TOTAL_PAGES,
  TOTAL_RECORDS,
} from "../constants/table.constant";
import type { ButtonProps } from "./button.type";

export interface BaseTableColumn {
  name: string;
  label: string;
  type: string;
  style?: React.CSSProperties;
  styleCell?: React.CSSProperties;
  colorCustom?: Record<string, string>;
  btnGroup?: ButtonProps[];
  refColor?: string[];
}

export interface BaseTableConfig {
  content: unknown[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export const BASE_TABLE_DEFAULT: BaseTableConfig = {
  content: [],
  page: PAGE_CURRENT,
  size: PAGE_SIZE,
  totalPages: TOTAL_PAGES,
  totalElements: TOTAL_RECORDS,
};

export interface TablePagination<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  fromDate?: string;
  toDate?: string;
}
