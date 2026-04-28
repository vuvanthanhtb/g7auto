import http from "@/libs/interceptor";
import { CONTRACTS_ENDPOINT } from "./contracts.endpoint";
import type { ContractRequest, ContractQuery, ContractResponse } from "./contracts.type";

class ContractsRepository {
  private static instance: ContractsRepository;
  private constructor() {}
  static getInstance() {
    if (!ContractsRepository.instance) ContractsRepository.instance = new ContractsRepository();
    return ContractsRepository.instance;
  }
  getList(params?: ContractQuery) {
    return http.call<{ content: ContractResponse[]; totalElements: number; totalPages: number; page: number; size: number }>({ url: CONTRACTS_ENDPOINT.LIST, method: "GET", params });
  }
  getById(id: number) {
    return http.call<ContractResponse>({ url: `${CONTRACTS_ENDPOINT.BASE}/${id}`, method: "GET" });
  }
  create(data: ContractRequest) {
    return http.call<ContractResponse>({ url: CONTRACTS_ENDPOINT.BASE, method: "POST", data });
  }
  complete(id: number) {
    return http.call<ContractResponse>({ url: `${CONTRACTS_ENDPOINT.BASE}/${id}/complete`, method: "POST" });
  }
  cancel(id: number) {
    return http.call<ContractResponse>({ url: `${CONTRACTS_ENDPOINT.BASE}/${id}/cancel`, method: "POST" });
  }
  exportExcel() { return http.download({ url: `${CONTRACTS_ENDPOINT.BASE}/export`, filename: "danh-sach-hop-dong.xlsx" }); }
}

export const contractsService = ContractsRepository.getInstance();
