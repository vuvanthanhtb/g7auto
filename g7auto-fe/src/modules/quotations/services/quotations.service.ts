import http from "@/libs/interceptor";
import { QUOTATIONS_ENDPOINT } from "./quotations.endpoint";
import type { QuotationRequest, QuotationQuery, QuotationResponse } from "../shell/quotations.type";
import type { AxiosResponse } from "axios";

type AR<T> = Promise<AxiosResponse<T>>;
type QuotationPage = { content: QuotationResponse[]; totalElements: number; totalPages: number; page: number; size: number };

const BASE = QUOTATIONS_ENDPOINT.BASE;

interface IQuotationsRepository {
  getList(params?: QuotationQuery): AR<QuotationPage>;
  getById(id: number): AR<QuotationResponse>;
  create(data: QuotationRequest): AR<QuotationResponse>;
  send(id: number): AR<QuotationResponse>;
  accept(id: number): AR<QuotationResponse>;
  cancel(id: number): AR<QuotationResponse>;
  exportExcel(): Promise<void>;
}

class QuotationsRepository implements IQuotationsRepository {
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
export const quotationsService: IQuotationsRepository = QuotationsRepository.getInstance();
