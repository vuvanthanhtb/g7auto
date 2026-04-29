import http from "@/libs/interceptor";
import { CAR_TRANSFERS_ENDPOINT } from "./car-transfers.endpoint";
import type { CarTransferRequest, CarTransferQuery, CarTransferResponse } from "../shell/car-transfers.type";
import type { AxiosResponse } from "axios";
import type { ResponseBase } from "@/libs/interceptor/types";

type AR<T> = Promise<AxiosResponse<ResponseBase<T>>>;
type CarTransferPage = { content: CarTransferResponse[]; totalElements: number; totalPages: number; page: number; size: number };

const BASE = CAR_TRANSFERS_ENDPOINT.BASE;

interface ICarTransfersRepository {
  getList(params?: CarTransferQuery): AR<CarTransferPage>;
  getById(id: number): AR<CarTransferResponse>;
  create(data: CarTransferRequest): AR<CarTransferResponse>;
  export(id: number): AR<CarTransferResponse>;
  receive(id: number): AR<CarTransferResponse>;
  cancel(id: number): AR<CarTransferResponse>;
  exportExcel(): Promise<void>;
}

class CarTransfersRepository implements ICarTransfersRepository {
  private static instance: CarTransfersRepository;
  private constructor() {}
  static getInstance() {
    if (!CarTransfersRepository.instance) CarTransfersRepository.instance = new CarTransfersRepository();
    return CarTransfersRepository.instance;
  }
  getList(params?: CarTransferQuery): AR<CarTransferPage> { return http.call<CarTransferPage>({ url: CAR_TRANSFERS_ENDPOINT.LIST, method: "GET", params }); }
  getById(id: number): AR<CarTransferResponse> { return http.call<CarTransferResponse>({ url: `${BASE}/${id}`, method: "GET" }); }
  create(data: CarTransferRequest): AR<CarTransferResponse> { return http.call<CarTransferResponse>({ url: BASE, method: "POST", data }); }
  export(id: number): AR<CarTransferResponse> { return http.call<CarTransferResponse>({ url: `${BASE}/${id}/export`, method: "POST" }); }
  receive(id: number): AR<CarTransferResponse> { return http.call<CarTransferResponse>({ url: `${BASE}/${id}/receive`, method: "POST" }); }
  cancel(id: number): AR<CarTransferResponse> { return http.call<CarTransferResponse>({ url: `${BASE}/${id}/cancel`, method: "POST" }); }
  exportExcel(): Promise<void> { return http.download({ url: `${BASE}/export`, filename: "danh-sach-dieu-chuyen-xe.xlsx" }); }
}
export const carTransfersService: ICarTransfersRepository = CarTransfersRepository.getInstance();
