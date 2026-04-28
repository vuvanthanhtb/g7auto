import http from "@/libs/interceptor";
import CUSTOMERS_ENDPOINT from "./customers.endpoint";
import type { CustomerRequest, CustomerResponse, CustomerQuery } from "./customers.type";

class CustomersRepository {
  private static instance: CustomersRepository;
  private constructor() {}
  static getInstance() { if (!CustomersRepository.instance) CustomersRepository.instance = new CustomersRepository(); return CustomersRepository.instance; }
  getList(params?: CustomerQuery) { return http.call<{ content: CustomerResponse[]; totalElements: number; totalPages: number; page: number; size: number }>({ url: CUSTOMERS_ENDPOINT.BASE, method: "GET", params }); }
  getById(id: number) { return http.call<CustomerResponse>({ url: `${CUSTOMERS_ENDPOINT.BASE}/${id}`, method: "GET" }); }
  create(data: CustomerRequest) { return http.call<CustomerResponse>({ url: CUSTOMERS_ENDPOINT.BASE, method: "POST", data }); }
  update(id: number, data: CustomerRequest) { return http.call<CustomerResponse>({ url: `${CUSTOMERS_ENDPOINT.BASE}/${id}`, method: "PUT", data }); }
  importFile(file: File) { return http.upload<{ total: number; success: number; failed: number; errors: string[] }>({ url: `${CUSTOMERS_ENDPOINT.BASE}/import`, file }); }
  downloadTemplate() { return http.download({ url: `${CUSTOMERS_ENDPOINT.BASE}/template`, filename: "mau-import-khach-hang.xlsx" }); }
  export() { return http.download({ url: `${CUSTOMERS_ENDPOINT.BASE}/export`, filename: "danh-sach-khach-hang.xlsx" }); }
}
export const customersService = CustomersRepository.getInstance();
