import { TokenService } from "./token.service";

export const AuthService = {
  logout: () => {
    TokenService.clear();
    window.location.href = "/dang-nhap";
  },
};
