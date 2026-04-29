import http from "@/libs/interceptor";
import { AUTH_ENDPOINT } from "./auth.endpoint";
import type {
  LoginRequest,
  LoginResponse,
  ProfileResponse,
  RefreshTokenResponse,
} from "../shell/auth.type";

class AuthRepository {
  private static instance: AuthRepository;
  private constructor() {}
  static getInstance() {
    if (!AuthRepository.instance)
      AuthRepository.instance = new AuthRepository();
    return AuthRepository.instance;
  }
  login(data: LoginRequest) {
    return http.call<LoginResponse>({
      url: AUTH_ENDPOINT.LOGIN,
      method: "POST",
      data,
    });
  }
  refresh(refreshToken: string) {
    return http.call<RefreshTokenResponse>({
      url: AUTH_ENDPOINT.REFRESH,
      method: "POST",
      data: { refreshToken },
    });
  }
  logout() {
    return http.call({ url: AUTH_ENDPOINT.LOGOUT, method: "POST" });
  }
  profile() {
    return http.call<ProfileResponse>({
      url: AUTH_ENDPOINT.PROFILE,
      method: "GET",
    });
  }
}
export const authService = AuthRepository.getInstance();
