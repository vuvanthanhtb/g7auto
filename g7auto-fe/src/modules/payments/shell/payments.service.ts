import http from "@/libs/interceptor";
import { PAYMENTS_ENDPOINT } from "./payments.endpoint";
import type { PaymentRequest, PaymentQuery, PaymentResponse } from "./payments.type";

class PaymentsRepository {
  private static instance: PaymentsRepository;
  private constructor() {}
  static getInstance() {
    if (!PaymentsRepository.instance) PaymentsRepository.instance = new PaymentsRepository();
    return PaymentsRepository.instance;
  }
  getList(params?: PaymentQuery) {
    return http.call<{ content: PaymentResponse[]; totalElements: number; totalPages: number; page: number; size: number }>({ url: PAYMENTS_ENDPOINT.LIST, method: "GET", params });
  }
  getById(id: number) {
    return http.call<PaymentResponse>({ url: `${PAYMENTS_ENDPOINT.BASE}/${id}`, method: "GET" });
  }
  create(data: PaymentRequest) {
    return http.call<PaymentResponse>({ url: PAYMENTS_ENDPOINT.BASE, method: "POST", data });
  }
  confirm(id: number) {
    return http.call<PaymentResponse>({ url: `${PAYMENTS_ENDPOINT.BASE}/${id}/confirm`, method: "POST" });
  }
  exportExcel() { return http.download({ url: `${PAYMENTS_ENDPOINT.BASE}/export`, filename: "danh-sach-thanh-toan.xlsx" }); }
}

export const paymentsService = PaymentsRepository.getInstance();
