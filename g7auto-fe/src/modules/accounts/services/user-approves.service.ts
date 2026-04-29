import http from "@/libs/interceptor";
import { USER_APPROVES_ENDPOINT } from "./user-approves.endpoint";
import type {
  UserApproveQuery,
  UserApproveResponse,
  UserApprovePage,
} from "../shell/accounts.type";
import type { AxiosResponse } from "axios";
import type { ResponseBase } from "@/libs/interceptor/types";

type AR<T> = Promise<AxiosResponse<ResponseBase<T>>>;

interface IUserApprovesRepository {
  getPendingApprovals(params?: UserApproveQuery): AR<UserApprovePage>;
  getApprovedUsers(params?: UserApproveQuery): AR<UserApprovePage>;
  getUserApprovalById(id: string): AR<UserApproveResponse>;
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

  getPendingApprovals(params?: UserApproveQuery) {
    return http.call<UserApprovePage>({
      url: USER_APPROVES_ENDPOINT.SEARCH_PENDING,
      method: "GET",
      params,
    });
  }
  getApprovedUsers(params?: UserApproveQuery) {
    return http.call<UserApprovePage>({
      url: USER_APPROVES_ENDPOINT.SEARCH_APPROVED,
      method: "GET",
      params,
    });
  }
  getUserApprovalById(id: string) {
    return http.call<UserApproveResponse>({
      url: `${USER_APPROVES_ENDPOINT.SEARCH_PENDING}/${id}`,
      method: "GET",
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
