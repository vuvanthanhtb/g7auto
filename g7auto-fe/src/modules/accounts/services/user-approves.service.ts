import http from "@/libs/interceptor";
import { USER_APPROVES_ENDPOINT } from "./user-approves.endpoint";
import type { UserApproveQuery, UserApproveResponse, UserApprovePage } from "../shell/accounts.type";
import type { AxiosResponse } from "axios";
import type { ResponseBase } from "@/libs/interceptor/types";

type AR<T> = Promise<AxiosResponse<ResponseBase<T>>>;

const BASE = USER_APPROVES_ENDPOINT.BASE;

interface IUserApprovesRepository {
  getUserApprovals(params?: UserApproveQuery): AR<UserApprovePage>;
  getUserApprovalById(id: string): AR<UserApproveResponse>;
  approveUser(id: string): AR<UserApproveResponse>;
  rejectUser(id: string): AR<UserApproveResponse>;
}

class UserApprovesRepository implements IUserApprovesRepository {
  private static instance: UserApprovesRepository;
  private constructor() {}

  static getInstance() {
    if (!UserApprovesRepository.instance)
      UserApprovesRepository.instance = new UserApprovesRepository();
    return UserApprovesRepository.instance;
  }

  getUserApprovals(params?: UserApproveQuery) {
    return http.call<UserApprovePage>({ url: BASE, method: "GET", params });
  }
  getUserApprovalById(id: string) {
    return http.call<UserApproveResponse>({ url: `${BASE}/${id}`, method: "GET" });
  }
  approveUser(id: string) {
    return http.call<UserApproveResponse>({ url: `${BASE}/${id}/approve`, method: "POST" });
  }
  rejectUser(id: string) {
    return http.call<UserApproveResponse>({ url: `${BASE}/${id}/reject`, method: "POST" });
  }
}

export const userApprovesService: IUserApprovesRepository = UserApprovesRepository.getInstance();
