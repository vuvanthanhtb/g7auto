import http from "@/libs/interceptor";
import { ACCOUNTS_ENDPOINT } from "./accounts.endpoint";
import type {
  AccountRequest,
  AccountResponse,
  AccountSearchQuery,
} from "../shell/accounts.type";
import type { AxiosResponse } from "axios";
import type { ResponseBase } from "@/libs/interceptor/types";
import type {
  AccountSearchForm,
  AccountPage,
} from "../pages/tabs/account-list-tab/account-list-tab.type";

type AR<T> = Promise<AxiosResponse<ResponseBase<T>>>;

const BASE = ACCOUNTS_ENDPOINT.BASE;

interface IAccountsRepository {
  searchAccounts(params?: AccountSearchQuery): AR<AccountPage>;
  getById(id: number): AR<AccountResponse>;
  create(data: AccountRequest): AR<AccountResponse>;
  update(id: number, data: Partial<AccountRequest>): AR<AccountResponse>;
  lock(id: number): AR<AccountResponse>;
  unlock(id: number): AR<AccountResponse>;
  exportExcel(params?: AccountSearchForm): Promise<Blob>;
  requestChangeStatus(status: string): AR<string>;
}

class AccountsRepository implements IAccountsRepository {
  private static instance: AccountsRepository;
  private constructor() {}

  static getInstance() {
    if (!AccountsRepository.instance)
      AccountsRepository.instance = new AccountsRepository();
    return AccountsRepository.instance;
  }

  searchAccounts(params?: AccountSearchQuery) {
    return http.call<AccountPage>({
      url: ACCOUNTS_ENDPOINT.LIST,
      method: "GET",
      params,
    });
  }
  getById(id: number) {
    return http.call<AccountResponse>({ url: `${BASE}/${id}`, method: "GET" });
  }
  create(data: AccountRequest) {
    return http.call<AccountResponse>({ url: BASE, method: "POST", data });
  }
  update(id: number, data: Partial<AccountRequest>) {
    return http.call<AccountResponse>({
      url: `${BASE}/${id}`,
      method: "PUT",
      data,
    });
  }
  lock(id: number) {
    return http.call<AccountResponse>({
      url: `${BASE}/${id}/lock`,
      method: "POST",
    });
  }
  unlock(id: number) {
    return http.call<AccountResponse>({
      url: `${BASE}/${id}/unlock`,
      method: "POST",
    });
  }

  exportExcel(params?: AccountSearchForm) {
    return http.download({
      url: `${BASE}/export`,
      method: "GET",
      params,
    });
  }

  requestChangeStatus(status: string) {
    return http.call<string>({
      url: ACCOUNTS_ENDPOINT.STATUS,
      method: "POST",
      data: { status },
    });
  }
}

export const accountsService: IAccountsRepository =
  AccountsRepository.getInstance();
