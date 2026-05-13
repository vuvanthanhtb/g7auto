import http from "@/libs/interceptor";
import { DEPOSITS_ENDPOINT } from "./deposits.endpoint";
import type { DepositRequest, DepositPayload, DepositResponse } from "./deposits.type";

type DepositPage = { content: DepositResponse[]; totalElements: number; totalPages: number; page: number; size: number };

class DepositsRepository {
  private static instance: DepositsRepository;
  private constructor() {}
  static getInstance() {
    if (!DepositsRepository.instance) DepositsRepository.instance = new DepositsRepository();
    return DepositsRepository.instance;
  }
  getList(params?: DepositPayload) {
    return http.call<DepositPage>({ url: DEPOSITS_ENDPOINT.LIST, method: "GET", params });
  }
  getAll() {
    return http.call<DepositResponse[]>({ url: DEPOSITS_ENDPOINT.ALL, method: "GET" });
  }
  getById(id: number) {
    return http.call<DepositResponse>({ url: `${DEPOSITS_ENDPOINT.BASE}/${id}`, method: "GET" });
  }
  create(data: DepositRequest) {
    return http.call<DepositResponse>({ url: DEPOSITS_ENDPOINT.BASE, method: "POST", data });
  }
  refund(id: number, notes?: string) {
    return http.call<DepositResponse>({ url: `${DEPOSITS_ENDPOINT.BASE}/${id}/refund`, method: "POST", params: { notes } });
  }
  cancel(id: number, reason?: string) {
    return http.call<DepositResponse>({ url: `${DEPOSITS_ENDPOINT.BASE}/${id}/cancel`, method: "POST", params: { reason } });
  }
  convertToContract(id: number, params?: { signDate?: string; expectedDeliveryDate?: string; notes?: string }) {
    return http.call<unknown>({ url: `${DEPOSITS_ENDPOINT.BASE}/${id}/convert-to-contract`, method: "POST", params });
  }
  exportExcel() {
    return http.download({ url: `${DEPOSITS_ENDPOINT.BASE}/export`, filename: "danh-sach-dat-coc.xlsx" });
  }
}

export const depositsService = DepositsRepository.getInstance();
