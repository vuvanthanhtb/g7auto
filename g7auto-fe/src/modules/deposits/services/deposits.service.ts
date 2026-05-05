import http from "@/libs/interceptor";
import { DEPOSITS_ENDPOINT } from "./deposits.endpoint";
import type { DepositRequest, DepositQuery, DepositResponse } from "../shell/deposits.type";
import type { AxiosResponse } from "axios";

type AR<T> = Promise<AxiosResponse<T>>;
type DepositPage = { content: DepositResponse[]; totalElements: number; totalPages: number; page: number; size: number };

const BASE = DEPOSITS_ENDPOINT.BASE;

interface IDepositsRepository {
  getList(params?: DepositQuery): AR<DepositPage>;
  getById(id: number): AR<DepositResponse>;
  create(data: DepositRequest): AR<DepositResponse>;
  convert(id: number): AR<DepositResponse>;
  refund(id: number): AR<DepositResponse>;
  cancel(id: number): AR<DepositResponse>;
  exportExcel(): Promise<void>;
}

class DepositsRepository implements IDepositsRepository {
  private static instance: DepositsRepository;
  private constructor() {}
  static getInstance() {
    if (!DepositsRepository.instance) DepositsRepository.instance = new DepositsRepository();
    return DepositsRepository.instance;
  }
  getList(params?: DepositQuery): AR<DepositPage> { return http.call<DepositPage>({ url: DEPOSITS_ENDPOINT.LIST, method: "GET", params }); }
  getById(id: number): AR<DepositResponse> { return http.call<DepositResponse>({ url: `${BASE}/${id}`, method: "GET" }); }
  create(data: DepositRequest): AR<DepositResponse> { return http.call<DepositResponse>({ url: BASE, method: "POST", data }); }
  convert(id: number): AR<DepositResponse> { return http.call<DepositResponse>({ url: `${BASE}/${id}/convert`, method: "POST" }); }
  refund(id: number): AR<DepositResponse> { return http.call<DepositResponse>({ url: `${BASE}/${id}/refund`, method: "POST" }); }
  cancel(id: number): AR<DepositResponse> { return http.call<DepositResponse>({ url: `${BASE}/${id}/cancel`, method: "POST" }); }
  exportExcel(): Promise<void> { return http.download({ url: `${BASE}/export`, filename: "danh-sach-dat-coc.xlsx" }); }
}
export const depositsService: IDepositsRepository = DepositsRepository.getInstance();
