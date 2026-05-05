import http from "@/libs/interceptor";
import { SERVICE_HISTORY_ENDPOINT } from "./service-history.endpoint";
import type { ServiceHistoryRequest, ServiceHistoryQuery, ServiceHistoryResponse } from "../shell/service-history.type";
import type { AxiosResponse } from "axios";

type AR<T> = Promise<AxiosResponse<T>>;
type ServiceHistoryPage = { content: ServiceHistoryResponse[]; totalElements: number; totalPages: number; page: number; size: number };

const BASE = SERVICE_HISTORY_ENDPOINT.BASE;

interface IServiceHistoryRepository {
  getList(params?: ServiceHistoryQuery): AR<ServiceHistoryPage>;
  getById(id: number): AR<ServiceHistoryResponse>;
  create(data: ServiceHistoryRequest): AR<ServiceHistoryResponse>;
  update(id: number, data: ServiceHistoryRequest): AR<ServiceHistoryResponse>;
  delete(id: number): AR<void>;
  exportExcel(): Promise<void>;
}

class ServiceHistoryRepository implements IServiceHistoryRepository {
  private static instance: ServiceHistoryRepository;
  private constructor() {}
  static getInstance() {
    if (!ServiceHistoryRepository.instance) ServiceHistoryRepository.instance = new ServiceHistoryRepository();
    return ServiceHistoryRepository.instance;
  }
  getList(params?: ServiceHistoryQuery): AR<ServiceHistoryPage> { return http.call<ServiceHistoryPage>({ url: SERVICE_HISTORY_ENDPOINT.LIST, method: "GET", params }); }
  getById(id: number): AR<ServiceHistoryResponse> { return http.call<ServiceHistoryResponse>({ url: `${BASE}/${id}`, method: "GET" }); }
  create(data: ServiceHistoryRequest): AR<ServiceHistoryResponse> { return http.call<ServiceHistoryResponse>({ url: BASE, method: "POST", data }); }
  update(id: number, data: ServiceHistoryRequest): AR<ServiceHistoryResponse> { return http.call<ServiceHistoryResponse>({ url: `${BASE}/${id}`, method: "PUT", data }); }
  delete(id: number): AR<void> { return http.call<void>({ url: `${BASE}/${id}`, method: "DELETE" }); }
  exportExcel(): Promise<void> { return http.download({ url: `${BASE}/export`, filename: "danh-sach-lich-su-cham-soc.xlsx" }); }
}
export const serviceHistoryService: IServiceHistoryRepository = ServiceHistoryRepository.getInstance();
