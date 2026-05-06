import { useState } from "react";
import { Divider, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import { updateProfile, changePassword } from "@/modules/auth/shell/auth.slice";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import { TEXT, BUTTON } from "@/libs/constants/form.constant";
import { BTN_SUBMIT } from "@/libs/constants/button.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type {
  UpdateProfileRequest,
  ChangePasswordRequest,
} from "@/modules/auth/shell/auth.type";
import * as Yup from "yup";
import { t } from "@/libs/i18n";

const getProfileFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "username", label: t("FIELD_LOGIN_NAME"), size: 12, disabled: true },
    { type: TEXT, name: "fullName", label: t("FIELD_FULL_NAME_PROFILE"), required: true, size: 12 },
    { type: TEXT, name: "email", label: t("LABEL_EMAIL"), required: true, size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: t("BTN_SAVE_INFO"), type: "submit", action: BTN_SUBMIT }],
    },
  ],
});

const getProfileValidation = () => Yup.object({
  fullName: Yup.string().required(t("VALIDATION_FULL_NAME_REQUIRED")),
  email: Yup.string()
    .email(t("VALIDATION_EMAIL_INVALID"))
    .required(t("VALIDATION_EMAIL_REQUIRED")),
});

const getPasswordFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "currentPassword", label: t("FIELD_CURRENT_PASSWORD"), required: true, size: 12, isPassword: true },
    { type: TEXT, name: "newPassword", label: t("FIELD_NEW_PASSWORD"), required: true, size: 12, isPassword: true },
    { type: TEXT, name: "confirmPassword", label: t("FIELD_CONFIRM_PASSWORD"), required: true, size: 12, isPassword: true },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: t("BTN_CHANGE_PASSWORD"), type: "submit", action: BTN_SUBMIT }],
    },
  ],
});

const getPasswordValidation = () => Yup.object({
  currentPassword: Yup.string().required(t("VALIDATION_CURRENT_PASSWORD_REQUIRED")),
  newPassword: Yup.string()
    .min(6, t("VALIDATION_NEW_PASSWORD_MIN"))
    .required(t("VALIDATION_NEW_PASSWORD_REQUIRED")),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], t("VALIDATION_CONFIRM_PASSWORD_MATCH"))
    .required(t("VALIDATION_CONFIRM_PASSWORD_REQUIRED")),
});

interface Props {
  open: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  const [profileValues, setProfileValues] = useState({
    username: user?.username ?? "",
    fullName: user?.fullName ?? "",
    email: user?.email ?? "",
  });

  const passwordValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleUpdateProfile = async (data: Record<string, unknown>) => {
    await dispatch(
      updateProfile({
        fullName: data.fullName as string,
        email: data.email as string,
      } as UpdateProfileRequest),
    );
  };

  const handleChangePassword = async (data: Record<string, unknown>) => {
    const result = await dispatch(
      changePassword({
        currentPassword: data.currentPassword as string,
        newPassword: data.newPassword as string,
      } as ChangePasswordRequest),
    );
    if (changePassword.rejected.match(result)) return false;
  };

  return (
    <BaseDrawer open={open} onClose={onClose} title={t("PROFILE_TITLE")}>
      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
        {t("PROFILE_PERSONAL_INFO")}
      </Typography>
      <BaseFormComponent
        formConfig={getProfileFormConfig()}
        validationSchema={getProfileValidation()}
        values={profileValues}
        onChange={(d) =>
          setProfileValues((p) => ({ ...p, ...d }) as typeof profileValues)
        }
        handlers={{ [BTN_SUBMIT]: handleUpdateProfile }}
      />

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
        {t("PROFILE_CHANGE_PASSWORD")}
      </Typography>
      <BaseFormComponent
        formConfig={getPasswordFormConfig()}
        validationSchema={getPasswordValidation()}
        values={passwordValues}
        handlers={{ [BTN_SUBMIT]: handleChangePassword }}
      />
    </BaseDrawer>
  );
};

export default ProfileDrawer;
