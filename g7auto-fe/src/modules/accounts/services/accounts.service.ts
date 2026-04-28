import http from "@/libs/interceptor";
import { ACCOUNTS_ENDPOINT } from "./accounts.endpoint";
import type {
  AccountRequest,
  AccountQuery,
  AccountResponse,
  ChangePasswordRequest,
  AccountPage,
  ImportResult,
} from "../shell/accounts.type";
import type { AxiosResponse } from "axios";
import type { ResponseBase } from "@/libs/interceptor/types";

type AR<T> = Promise<AxiosResponse<ResponseBase<T>>>;

const BASE = ACCOUNTS_ENDPOINT.BASE;

interface IAccountsRepository {
  searchAccounts(params?: AccountQuery): AR<AccountPage>;
  getById(id: number): AR<AccountResponse>;
  create(data: AccountRequest): AR<AccountResponse>;
  update(id: number, data: Partial<AccountRequest>): AR<AccountResponse>;
  lock(id: number): AR<AccountResponse>;
  unlock(id: number): AR<AccountResponse>;
  changePassword(data: ChangePasswordRequest): AR<void>;
  importFile(file: File): AR<ImportResult>;
  downloadTemplate(): Promise<void>;
  exportExcel(): Promise<void>;
}

class AccountsRepository implements IAccountsRepository {
  private static instance: AccountsRepository;
  private constructor() {}

  static getInstance() {
    if (!AccountsRepository.instance)
      AccountsRepository.instance = new AccountsRepository();
    return AccountsRepository.instance;
  }

  searchAccounts(params?: AccountQuery) {
    return http.call<AccountPage>({ url: ACCOUNTS_ENDPOINT.LIST, method: "GET", params });
  }
  getById(id: number) {
    return http.call<AccountResponse>({ url: `${BASE}/${id}`, method: "GET" });
  }
  create(data: AccountRequest) {
    return http.call<AccountResponse>({ url: BASE, method: "POST", data });
  }
  update(id: number, data: Partial<AccountRequest>) {
    return http.call<AccountResponse>({ url: `${BASE}/${id}`, method: "PUT", data });
  }
  lock(id: number) {
    return http.call<AccountResponse>({ url: `${BASE}/${id}/lock`, method: "POST" });
  }
  unlock(id: number) {
    return http.call<AccountResponse>({ url: `${BASE}/${id}/unlock`, method: "POST" });
  }
  changePassword(data: ChangePasswordRequest) {
    return http.call<void>({ url: ACCOUNTS_ENDPOINT.CHANGE_PASSWORD, method: "POST", data });
  }
  importFile(file: File) {
    return http.upload<ImportResult>({ url: `${BASE}/import`, file });
  }
  downloadTemplate() {
    return http.download({ url: `${BASE}/template`, filename: "mau-import-tai-khoan.xlsx" });
  }
  exportExcel() {
    return http.download({ url: `${BASE}/export`, filename: "danh-sach-tai-khoan.xlsx" });
  }
}

export const accountsService: IAccountsRepository = AccountsRepository.getInstance();
