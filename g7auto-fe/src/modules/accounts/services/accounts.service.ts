import http from "@/libs/interceptor";
import { ACCOUNTS_ENDPOINT } from "./accounts.endpoint";
import type {
  AccountSearchForm,
  AccountPage,
} from "../pages/tabs/accounts-list-tab/account-list-tab.type";
import type { IResponse } from "@/libs/interceptor/types";

const BASE = ACCOUNTS_ENDPOINT.BASE;

interface IAccountsRepository {
  searchAccounts(params?: AccountSearchForm): IResponse<AccountPage>;
  exportExcel(params?: AccountSearchForm): Promise<Blob>;
  requestChangeStatus(status: string): IResponse<string>;
}

class AccountsRepository implements IAccountsRepository {
  private static instance: AccountsRepository;
  private constructor() {}

  static getInstance() {
    if (!AccountsRepository.instance)
      AccountsRepository.instance = new AccountsRepository();
    return AccountsRepository.instance;
  }

  searchAccounts(params?: AccountSearchForm) {
    return http.call<AccountPage>({
      url: ACCOUNTS_ENDPOINT.LIST,
      method: "GET",
      params,
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
