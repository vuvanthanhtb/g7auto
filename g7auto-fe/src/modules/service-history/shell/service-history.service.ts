import http from "@/libs/interceptor";
import { SERVICE_HISTORY_ENDPOINT } from "./service-history.endpoint";
import type { ServiceHistoryRequest, ServiceHistoryQuery, ServiceHistoryResponse } from "./service-history.type";

class ServiceHistoryRepository {
  private static instance: ServiceHistoryRepository;
  private constructor() {}
  static getInstance() {
    if (!ServiceHistoryRepository.instance) ServiceHistoryRepository.instance = new ServiceHistoryRepository();
    return ServiceHistoryRepository.instance;
  }
  getList(params?: ServiceHistoryQuery) {
    return http.call<{ content: ServiceHistoryResponse[]; totalElements: number; totalPages: number; page: number; size: number }>({ url: SERVICE_HISTORY_ENDPOINT.LIST, method: "GET", params });
  }
  getById(id: number) {
    return http.call<ServiceHistoryResponse>({ url: `${SERVICE_HISTORY_ENDPOINT.BASE}/${id}`, method: "GET" });
  }
  create(data: ServiceHistoryRequest) {
    return http.call<ServiceHistoryResponse>({ url: SERVICE_HISTORY_ENDPOINT.BASE, method: "POST", data });
  }
  update(id: number, data: ServiceHistoryRequest) {
    return http.call<ServiceHistoryResponse>({ url: `${SERVICE_HISTORY_ENDPOINT.BASE}/${id}`, method: "PUT", data });
  }
  delete(id: number) {
    return http.call<void>({ url: `${SERVICE_HISTORY_ENDPOINT.BASE}/${id}`, method: "DELETE" });
  }
  exportExcel() { return http.download({ url: `${SERVICE_HISTORY_ENDPOINT.BASE}/export`, filename: "danh-sach-lich-su-cham-soc.xlsx" }); }
}

export const serviceHistoryService = ServiceHistoryRepository.getInstance();
