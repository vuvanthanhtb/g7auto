import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import { loginUser } from "@/modules/auth/shell/auth.slice";
import BaseFormComponent from "@/libs/components/ui/base-form";
import type { LoginFormValues } from "../../shell/auth.type";
import { getLoginConfig, initialValues } from "./login.config";
import { loginValidation } from "./login.validation";
import { HOME_PATH } from "@/modules/home/shell/home.route";
import { BTN_SUBMIT } from "@/libs/constants/button.constant";
import { t } from "@/libs/i18n";
import styles from "./login.module.scss";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [formValues, setFormValues] = useState<LoginFormValues>(initialValues);

  useEffect(() => {
    document.title = t("LOGIN_PAGE_TITLE");
  }, []);

  if (isAuthenticated) return <Navigate to={HOME_PATH.BASE} replace />;

  const handleLogin = async (data: LoginFormValues) => {
    const result = await dispatch(loginUser(data));
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
        <p className={styles["form-login__subtitle"]}>{t("LOGIN_SUBTITLE")}</p>
        <div className={styles["form-login__form"]}>
          <BaseFormComponent<LoginFormValues>
            formConfig={getLoginConfig()}
            validationSchema={loginValidation}
            values={formValues}
            onChange={setFormValues}
            handlers={{ [BTN_SUBMIT]: handleLogin as (data: unknown) => Promise<void> }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
