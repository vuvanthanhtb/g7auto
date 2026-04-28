import http from "@/libs/interceptor";
import { PAYMENTS_ENDPOINT } from "./payments.endpoint";
import type { PaymentRequest, PaymentQuery, PaymentResponse } from "../shell/payments.type";
import type { AxiosResponse } from "axios";
import type { ResponseBase } from "@/libs/interceptor/types";

type AR<T> = Promise<AxiosResponse<ResponseBase<T>>>;
type PaymentPage = { content: PaymentResponse[]; totalElements: number; totalPages: number; page: number; size: number };

const BASE = PAYMENTS_ENDPOINT.BASE;

class PaymentsRepository {
  private static instance: PaymentsRepository;
  private constructor() {}
  static getInstance() {
    if (!PaymentsRepository.instance) PaymentsRepository.instance = new PaymentsRepository();
    return PaymentsRepository.instance;
  }
  getList(params?: PaymentQuery): AR<PaymentPage> { return http.call<PaymentPage>({ url: PAYMENTS_ENDPOINT.LIST, method: "GET", params }); }
  getById(id: number): AR<PaymentResponse> { return http.call<PaymentResponse>({ url: `${BASE}/${id}`, method: "GET" }); }
  create(data: PaymentRequest): AR<PaymentResponse> { return http.call<PaymentResponse>({ url: BASE, method: "POST", data }); }
  confirm(id: number): AR<PaymentResponse> { return http.call<PaymentResponse>({ url: `${BASE}/${id}/confirm`, method: "POST" }); }
  exportExcel(): Promise<void> { return http.download({ url: `${BASE}/export`, filename: "danh-sach-thanh-toan.xlsx" }); }
}
export const paymentsService = PaymentsRepository.getInstance();
