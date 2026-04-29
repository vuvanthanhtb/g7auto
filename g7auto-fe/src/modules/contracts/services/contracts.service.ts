import http from "@/libs/interceptor";
import { CONTRACTS_ENDPOINT } from "./contracts.endpoint";
import type { ContractRequest, ContractQuery, ContractResponse } from "../shell/contracts.type";
import type { AxiosResponse } from "axios";
import type { ResponseBase } from "@/libs/interceptor/types";

type AR<T> = Promise<AxiosResponse<ResponseBase<T>>>;
type ContractPage = { content: ContractResponse[]; totalElements: number; totalPages: number; page: number; size: number };

const BASE = CONTRACTS_ENDPOINT.BASE;

interface IContractsRepository {
  getList(params?: ContractQuery): AR<ContractPage>;
  getById(id: number): AR<ContractResponse>;
  create(data: ContractRequest): AR<ContractResponse>;
  complete(id: number): AR<ContractResponse>;
  cancel(id: number): AR<ContractResponse>;
  exportExcel(): Promise<void>;
}

class ContractsRepository implements IContractsRepository {
  private static instance: ContractsRepository;
  private constructor() {}
  static getInstance() {
    if (!ContractsRepository.instance) ContractsRepository.instance = new ContractsRepository();
    return ContractsRepository.instance;
  }
  getList(params?: ContractQuery): AR<ContractPage> { return http.call<ContractPage>({ url: CONTRACTS_ENDPOINT.LIST, method: "GET", params }); }
  getById(id: number): AR<ContractResponse> { return http.call<ContractResponse>({ url: `${BASE}/${id}`, method: "GET" }); }
  create(data: ContractRequest): AR<ContractResponse> { return http.call<ContractResponse>({ url: BASE, method: "POST", data }); }
  complete(id: number): AR<ContractResponse> { return http.call<ContractResponse>({ url: `${BASE}/${id}/complete`, method: "POST" }); }
  cancel(id: number): AR<ContractResponse> { return http.call<ContractResponse>({ url: `${BASE}/${id}/cancel`, method: "POST" }); }
  exportExcel(): Promise<void> { return http.download({ url: `${BASE}/export`, filename: "danh-sach-hop-dong.xlsx" }); }
}
export const contractsService: IContractsRepository = ContractsRepository.getInstance();
