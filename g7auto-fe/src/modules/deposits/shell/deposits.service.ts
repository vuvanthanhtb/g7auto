import http from "@/libs/interceptor";
import { DEPOSITS_ENDPOINT } from "./deposits.endpoint";
import type { DepositRequest, DepositQuery, DepositResponse } from "./deposits.type";

class DepositsRepository {
  private static instance: DepositsRepository;
  private constructor() {}
  static getInstance() {
    if (!DepositsRepository.instance) DepositsRepository.instance = new DepositsRepository();
    return DepositsRepository.instance;
  }
  getList(params?: DepositQuery) {
    return http.call<{ content: DepositResponse[]; totalElements: number; totalPages: number; page: number; size: number }>({ url: DEPOSITS_ENDPOINT.LIST, method: "GET", params });
  }
  getById(id: number) {
    return http.call<DepositResponse>({ url: `${DEPOSITS_ENDPOINT.BASE}/${id}`, method: "GET" });
  }
  create(data: DepositRequest) {
    return http.call<DepositResponse>({ url: DEPOSITS_ENDPOINT.BASE, method: "POST", data });
  }
  convert(id: number) {
    return http.call<DepositResponse>({ url: `${DEPOSITS_ENDPOINT.BASE}/${id}/convert`, method: "POST" });
  }
  refund(id: number) {
    return http.call<DepositResponse>({ url: `${DEPOSITS_ENDPOINT.BASE}/${id}/refund`, method: "POST" });
  }
  cancel(id: number) {
    return http.call<DepositResponse>({ url: `${DEPOSITS_ENDPOINT.BASE}/${id}/cancel`, method: "POST" });
  }
  exportExcel() { return http.download({ url: `${DEPOSITS_ENDPOINT.BASE}/export`, filename: "danh-sach-dat-coc.xlsx" }); }
}

export const depositsService = DepositsRepository.getInstance();
