import http from "@/libs/interceptor";
import { CAR_TRANSFERS_ENDPOINT } from "./car-transfers.endpoint";
import type { CarTransferRequest, CarTransferQuery, CarTransferResponse } from "./car-transfers.type";

class CarTransfersRepository {
  private static instance: CarTransfersRepository;
  private constructor() {}
  static getInstance() {
    if (!CarTransfersRepository.instance) CarTransfersRepository.instance = new CarTransfersRepository();
    return CarTransfersRepository.instance;
  }
  getList(params?: CarTransferQuery) {
    return http.call<{ content: CarTransferResponse[]; totalElements: number; totalPages: number; page: number; size: number }>({ url: CAR_TRANSFERS_ENDPOINT.LIST, method: "GET", params });
  }
  getById(id: number) {
    return http.call<CarTransferResponse>({ url: `${CAR_TRANSFERS_ENDPOINT.BASE}/${id}`, method: "GET" });
  }
  create(data: CarTransferRequest) {
    return http.call<CarTransferResponse>({ url: CAR_TRANSFERS_ENDPOINT.BASE, method: "POST", data });
  }
  export(id: number) {
    return http.call<CarTransferResponse>({ url: `${CAR_TRANSFERS_ENDPOINT.BASE}/${id}/export`, method: "POST" });
  }
  receive(id: number) {
    return http.call<CarTransferResponse>({ url: `${CAR_TRANSFERS_ENDPOINT.BASE}/${id}/receive`, method: "POST" });
  }
  cancel(id: number) {
    return http.call<CarTransferResponse>({ url: `${CAR_TRANSFERS_ENDPOINT.BASE}/${id}/cancel`, method: "POST" });
  }
  exportExcel() { return http.download({ url: `${CAR_TRANSFERS_ENDPOINT.BASE}/export`, filename: "danh-sach-dieu-chuyen-xe.xlsx" }); }
}

export const carTransfersService = CarTransfersRepository.getInstance();
