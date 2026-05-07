import { TokenService } from "./token.service";
import { store } from "@/shell/redux/store";
import { logout } from "@/modules/auth/shell/auth.slice";

export const AuthService = {
  logout: () => {
    TokenService.clear();
    store.dispatch(logout());
  },
};
