import http from "@/libs/interceptor";
import { AUTH_ENDPOINT } from "./auth.endpoint";
import type { ProfileResponse, UpdateProfileRequest, ChangePasswordRequest } from "../shell/auth.type";

class ProfileRepository {
  private static instance: ProfileRepository;
  private constructor() {}
  static getInstance() {
    if (!ProfileRepository.instance) ProfileRepository.instance = new ProfileRepository();
    return ProfileRepository.instance;
  }
  get() {
    return http.call<ProfileResponse>({ url: AUTH_ENDPOINT.PROFILE, method: "GET" });
  }
  update(data: UpdateProfileRequest) {
    return http.call<ProfileResponse>({ url: AUTH_ENDPOINT.PROFILE, method: "PUT", data });
  }
  changePassword(data: ChangePasswordRequest) {
    return http.call({ url: AUTH_ENDPOINT.CHANGE_PASSWORD, method: "PUT", data });
  }
}
export const profileService = ProfileRepository.getInstance();
