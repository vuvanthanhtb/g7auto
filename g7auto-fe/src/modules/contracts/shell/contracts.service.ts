import http from "@/libs/interceptor";
import { CONTRACTS_ENDPOINT } from "./contracts.endpoint";
import type { ContractRequest, ContractUpdateRequest, ContractPayload, ContractResponse } from "./contracts.type";

type ContractPage = { content: ContractResponse[]; totalElements: number; totalPages: number; page: number; size: number };

class ContractsRepository {
  private static instance: ContractsRepository;
  private constructor() {}
  static getInstance() {
    if (!ContractsRepository.instance) ContractsRepository.instance = new ContractsRepository();
    return ContractsRepository.instance;
  }
  getList(params?: ContractPayload) {
    return http.call<ContractPage>({ url: CONTRACTS_ENDPOINT.LIST, method: "GET", params });
  }
  getById(id: number) {
    return http.call<ContractResponse>({ url: `${CONTRACTS_ENDPOINT.BASE}/${id}`, method: "GET" });
  }
  create(data: ContractRequest) {
    return http.call<ContractResponse>({ url: CONTRACTS_ENDPOINT.BASE, method: "POST", data });
  }
  update(id: number, data: ContractUpdateRequest) {
    return http.call<ContractResponse>({ url: `${CONTRACTS_ENDPOINT.BASE}/${id}`, method: "PUT", data });
  }
  delete(id: number) {
    return http.call<void>({ url: `${CONTRACTS_ENDPOINT.BASE}/${id}`, method: "DELETE" });
  }
  exportExcel() {
    return http.download({ url: `${CONTRACTS_ENDPOINT.BASE}/export`, filename: "danh-sach-hop-dong.xlsx" });
  }
}

export const contractsService = ContractsRepository.getInstance();
