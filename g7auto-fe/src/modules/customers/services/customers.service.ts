import http from "@/libs/interceptor";
import { CUSTOMERS_ENDPOINT } from "./customers.endpoint";
import type { CustomerRequest, CustomerResponse, CustomerQuery } from "../shell/customers.type";
import type { AxiosResponse } from "axios";

type AR<T> = Promise<AxiosResponse<T>>;
type CustomerPage = { content: CustomerResponse[]; totalElements: number; totalPages: number; page: number; size: number };
type ImportResult = { total: number; success: number; failed: number; errors: string[] };

const BASE = CUSTOMERS_ENDPOINT.BASE;

interface ICustomersRepository {
  getList(params?: CustomerQuery): AR<CustomerPage>;
  getById(id: number): AR<CustomerResponse>;
  create(data: CustomerRequest): AR<CustomerResponse>;
  update(id: number, data: CustomerRequest): AR<CustomerResponse>;
  importFile(file: File): AR<ImportResult>;
  downloadTemplate(): Promise<void>;
  export(): Promise<void>;
}

class CustomersRepository implements ICustomersRepository {
  private static instance: CustomersRepository;
  private constructor() {}
  static getInstance() {
    if (!CustomersRepository.instance) CustomersRepository.instance = new CustomersRepository();
    return CustomersRepository.instance;
  }
  getList(params?: CustomerQuery): AR<CustomerPage> { return http.call<CustomerPage>({ url: BASE, method: "GET", params }); }
  getById(id: number): AR<CustomerResponse> { return http.call<CustomerResponse>({ url: `${BASE}/${id}`, method: "GET" }); }
  create(data: CustomerRequest): AR<CustomerResponse> { return http.call<CustomerResponse>({ url: BASE, method: "POST", data }); }
  update(id: number, data: CustomerRequest): AR<CustomerResponse> { return http.call<CustomerResponse>({ url: `${BASE}/${id}`, method: "PUT", data }); }
  importFile(file: File): AR<ImportResult> { return http.upload<ImportResult>({ url: `${BASE}/import`, file }); }
  downloadTemplate(): Promise<void> { return http.download({ url: `${BASE}/template`, filename: "mau-import-khach-hang.xlsx" }); }
  export(): Promise<void> { return http.download({ url: `${BASE}/export`, filename: "danh-sach-khach-hang.xlsx" }); }
}
export const customersService: ICustomersRepository = CustomersRepository.getInstance();
