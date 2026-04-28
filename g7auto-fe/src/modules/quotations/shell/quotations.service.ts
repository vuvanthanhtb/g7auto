import http from "@/libs/interceptor";
import { QUOTATIONS_ENDPOINT } from "./quotations.endpoint";
import type { QuotationRequest, QuotationQuery, QuotationResponse } from "./quotations.type";

class QuotationsRepository {
  private static instance: QuotationsRepository;
  private constructor() {}
  static getInstance() {
    if (!QuotationsRepository.instance) QuotationsRepository.instance = new QuotationsRepository();
    return QuotationsRepository.instance;
  }
  getList(params?: QuotationQuery) {
    return http.call<{ content: QuotationResponse[]; totalElements: number; totalPages: number; page: number; size: number }>({ url: QUOTATIONS_ENDPOINT.LIST, method: "GET", params });
  }
  getById(id: number) {
    return http.call<QuotationResponse>({ url: `${QUOTATIONS_ENDPOINT.BASE}/${id}`, method: "GET" });
  }
  create(data: QuotationRequest) {
    return http.call<QuotationResponse>({ url: QUOTATIONS_ENDPOINT.BASE, method: "POST", data });
  }
  send(id: number) {
    return http.call<QuotationResponse>({ url: `${QUOTATIONS_ENDPOINT.BASE}/${id}/send`, method: "POST" });
  }
  accept(id: number) {
    return http.call<QuotationResponse>({ url: `${QUOTATIONS_ENDPOINT.BASE}/${id}/accept`, method: "POST" });
  }
  cancel(id: number) {
    return http.call<QuotationResponse>({ url: `${QUOTATIONS_ENDPOINT.BASE}/${id}/cancel`, method: "POST" });
  }
  exportExcel() { return http.download({ url: `${QUOTATIONS_ENDPOINT.BASE}/export`, filename: "danh-sach-bao-gia.xlsx" }); }
}

export const quotationsService = QuotationsRepository.getInstance();
