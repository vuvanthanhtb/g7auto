import http from "@/libs/interceptor";
import { QUOTATIONS_ENDPOINT } from "./quotations.endpoint";
import type { QuotationRequest, QuotationQuery, QuotationResponse } from "../shell/quotations.type";
import type { AxiosResponse } from "axios";
import type { ResponseBase } from "@/libs/interceptor/types";

type AR<T> = Promise<AxiosResponse<ResponseBase<T>>>;
type QuotationPage = { content: QuotationResponse[]; totalElements: number; totalPages: number; page: number; size: number };

const BASE = QUOTATIONS_ENDPOINT.BASE;

class QuotationsRepository {
  private static instance: QuotationsRepository;
  private constructor() {}
  static getInstance() {
    if (!QuotationsRepository.instance) QuotationsRepository.instance = new QuotationsRepository();
    return QuotationsRepository.instance;
  }
  getList(params?: QuotationQuery): AR<QuotationPage> { return http.call<QuotationPage>({ url: QUOTATIONS_ENDPOINT.LIST, method: "GET", params }); }
  getById(id: number): AR<QuotationResponse> { return http.call<QuotationResponse>({ url: `${BASE}/${id}`, method: "GET" }); }
  create(data: QuotationRequest): AR<QuotationResponse> { return http.call<QuotationResponse>({ url: BASE, method: "POST", data }); }
  send(id: number): AR<QuotationResponse> { return http.call<QuotationResponse>({ url: `${BASE}/${id}/send`, method: "POST" }); }
  accept(id: number): AR<QuotationResponse> { return http.call<QuotationResponse>({ url: `${BASE}/${id}/accept`, method: "POST" }); }
  cancel(id: number): AR<QuotationResponse> { return http.call<QuotationResponse>({ url: `${BASE}/${id}/cancel`, method: "POST" }); }
  exportExcel(): Promise<void> { return http.download({ url: `${BASE}/export`, filename: "danh-sach-bao-gia.xlsx" }); }
}
export const quotationsService = QuotationsRepository.getInstance();
