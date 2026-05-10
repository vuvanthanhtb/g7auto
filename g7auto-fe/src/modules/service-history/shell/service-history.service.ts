import http from "@/libs/interceptor";
import { SERVICE_HISTORY_ENDPOINT } from "./service-history.endpoint";
import type { ServiceHistoryRequest, ServiceHistoryPayload, ServiceHistoryResponse } from "./service-history.type";

type ServiceHistoryPage = { content: ServiceHistoryResponse[]; totalElements: number; totalPages: number; page: number; size: number };

class ServiceHistoryRepository {
  private static instance: ServiceHistoryRepository;
  private constructor() {}
  static getInstance() {
    if (!ServiceHistoryRepository.instance) ServiceHistoryRepository.instance = new ServiceHistoryRepository();
    return ServiceHistoryRepository.instance;
  }
  getList(params?: ServiceHistoryPayload) {
    return http.call<ServiceHistoryPage>({ url: SERVICE_HISTORY_ENDPOINT.LIST, method: "GET", params });
  }
  getById(id: number) {
    return http.call<ServiceHistoryResponse>({ url: `${SERVICE_HISTORY_ENDPOINT.BASE}/${id}`, method: "GET" });
  }
  create(data: ServiceHistoryRequest) {
    return http.call<ServiceHistoryResponse>({ url: SERVICE_HISTORY_ENDPOINT.BASE, method: "POST", data });
  }
  exportExcel() {
    return http.download({ url: `${SERVICE_HISTORY_ENDPOINT.BASE}/export`, filename: "danh-sach-lich-su-cham-soc.xlsx" });
  }
}

export const serviceHistoryService = ServiceHistoryRepository.getInstance();
