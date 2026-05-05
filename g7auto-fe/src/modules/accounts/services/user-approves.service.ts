import http from "@/libs/interceptor";
import { USER_APPROVES_ENDPOINT } from "./user-approves.endpoint";
import type {
  AccountApprovedPage,
  AccountApprovedSearchQuery,
} from "../pages/tabs/accounts-approved-tab/approved-users-tab.type";
import type {
  AccountPendingPage,
  AccountPendingSearchQuery,
} from "../pages/tabs/accounts-pending-tab/pending-approvals-tab.type";
import type { IResponse } from "@/libs/interceptor/types";

interface IUserApprovesRepository {
  getPendingApprovals(
    params?: AccountPendingSearchQuery,
  ): IResponse<AccountPendingPage>;
  getApprovedUsers(
    params?: AccountApprovedSearchQuery,
  ): IResponse<AccountApprovedPage>;
  changeStatus(username: string, action: string): IResponse<string>;
  requestApproval(username: string, action: string): IResponse<string>;
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
    return http.call<AccountPendingPage>({
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
