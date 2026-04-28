import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import { loginUser } from "@/modules/auth/shell/auth.slice";
import BaseFormComponent from "@/libs/components/ui/base-form";
import type { LoginRequest } from "../../shell/auth.type";
import { initialValues, loginConfig } from "./login.config";
import { loginValidation } from "./login.validation";
import { HOME_PATH } from "@/modules/home/shell/home.route";
import { BTN_SUBMIT } from "@/libs/constants/button.constant";
import styles from "./login.module.scss";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [formValues, setFormValues] =
    useState<Record<string, unknown>>(initialValues);

  useEffect(() => {
    document.title = "Đăng nhập — G7Auto";
  }, []);

  if (isAuthenticated) return <Navigate to={HOME_PATH.BASE} replace />;

  const handleLogin = async (data: Record<string, unknown>) => {
    const result = await dispatch(loginUser(data as unknown as LoginRequest));
    if (loginUser.fulfilled.match(result))
      navigate(HOME_PATH.BASE, { replace: true });
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["form-login"]}>
        <div className={styles["form-login__logo"]}>
          <DirectionsCarIcon sx={{ color: "#1a73e8", fontSize: 36 }} />
          <span className={styles["form-login__title"]}>G7Auto</span>
        </div>
        <p className={styles["form-login__subtitle"]}>
          Hệ thống quản lý đại lý ô tô
        </p>
        <div className={styles["form-login__form"]}>
          <BaseFormComponent
            formConfig={loginConfig}
            validationSchema={loginValidation}
            values={formValues}
            onChange={(data) => setFormValues((prev) => ({ ...prev, ...data }))}
            handlers={{ [BTN_SUBMIT]: handleLogin }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
