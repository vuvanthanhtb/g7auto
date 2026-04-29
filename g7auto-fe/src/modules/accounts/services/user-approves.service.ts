import http from "@/libs/interceptor";
import { USER_APPROVES_ENDPOINT } from "./user-approves.endpoint";
import type { AxiosResponse } from "axios";
import type { ResponseBase } from "@/libs/interceptor/types";
import type {
  AccountApprovedPage,
  AccountApprovedSearchQuery,
} from "../pages/tabs/approved-users-tab/approved-users-tab.type";
import type {
  AccountPendingSearchQuery,
  AccountPendingTable,
} from "../pages/tabs/pending-approvals-tab/pending-approvals-tab.type";

type AR<T> = Promise<AxiosResponse<ResponseBase<T>>>;

interface IUserApprovesRepository {
  getPendingApprovals(
    params?: AccountPendingSearchQuery,
  ): AR<AccountPendingTable>;
  getApprovedUsers(
    params?: AccountApprovedSearchQuery,
  ): AR<AccountApprovedPage>;
  changeStatus(username: string, action: string): AR<string>;
  requestApproval(username: string, action: string): AR<string>;
}

class UserApprovesRepository implements IUserApprovesRepository {
  private static instance: UserApprovesRepository;
  private constructor() {}

  static getInstance() {
    if (!UserApprovesRepository.instance)
      UserApprovesRepository.instance = new UserApprovesRepository();
    return UserApprovesRepository.instance;
  }

  getPendingApprovals(params?: AccountPendingSearchQuery) {
    return http.call<AccountPendingTable>({
      url: USER_APPROVES_ENDPOINT.SEARCH_PENDING,
      method: "GET",
      params,
    });
  }

  getApprovedUsers(params?: AccountApprovedSearchQuery) {
    return http.call<AccountApprovedPage>({
      url: USER_APPROVES_ENDPOINT.SEARCH_APPROVED,
      method: "GET",
      params,
    });
  }

  changeStatus(username: string, action: string) {
    return http.call<string>({
      url: USER_APPROVES_ENDPOINT.CHANGE_STATUS,
      method: "POST",
      data: { username, action },
    });
  }

  requestApproval(username: string, action: string) {
    return http.call<string>({
      url: USER_APPROVES_ENDPOINT.REQUEST_APPROVAL,
      method: "POST",
      data: { username, action },
    });
  }
}

export const userApprovesService: IUserApprovesRepository =
  UserApprovesRepository.getInstance();
