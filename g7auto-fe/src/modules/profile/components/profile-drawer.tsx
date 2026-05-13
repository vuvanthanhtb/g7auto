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
  ProfileDrawerFormValues,
  PasswordFormValues,
} from "@/modules/auth/shell/auth.type";
import * as Yup from "yup";
import { t } from "@/libs/i18n";

const getProfileFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "username", label: "PROFILE_FIELD_LOGIN_NAME", size: 12, disabled: true },
    { type: TEXT, name: "fullName", label: "PROFILE_FIELD_FULL_NAME", required: true, size: 12 },
    { type: TEXT, name: "email", label: "COMMON_LABEL_EMAIL", required: true, size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "PROFILE_BTN_SAVE_INFO", type: "submit", action: BTN_SUBMIT }],
    },
  ],
});

const getProfileValidation = () => Yup.object({
  fullName: Yup.string().required(t("PROFILE_VALIDATION_FULL_NAME_REQUIRED")),
  email: Yup.string()
    .email(t("PROFILE_VALIDATION_EMAIL_INVALID"))
    .required(t("PROFILE_VALIDATION_EMAIL_REQUIRED")),
});

const getPasswordFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "currentPassword", label: "PROFILE_FIELD_CURRENT_PASSWORD", required: true, size: 12, isPassword: true },
    { type: TEXT, name: "newPassword", label: "PROFILE_FIELD_NEW_PASSWORD", required: true, size: 12, isPassword: true },
    { type: TEXT, name: "confirmPassword", label: "PROFILE_FIELD_CONFIRM_PASSWORD", required: true, size: 12, isPassword: true },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "PROFILE_BTN_CHANGE_PASSWORD", type: "submit", action: BTN_SUBMIT }],
    },
  ],
});

const getPasswordValidation = () => Yup.object({
  currentPassword: Yup.string().required(t("PROFILE_VALIDATION_CURRENT_PASSWORD_REQUIRED")),
  newPassword: Yup.string()
    .min(6, t("PROFILE_VALIDATION_NEW_PASSWORD_MIN"))
    .required(t("PROFILE_VALIDATION_NEW_PASSWORD_REQUIRED")),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], t("PROFILE_VALIDATION_CONFIRM_PASSWORD_MATCH"))
    .required(t("PROFILE_VALIDATION_CONFIRM_PASSWORD_REQUIRED")),
});

interface Props {
  open: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  const [profileValues, setProfileValues] = useState<ProfileDrawerFormValues>({
    username: user?.username ?? "",
    fullName: user?.fullName ?? "",
    email: user?.email ?? "",
  });

  const [passwordValues] = useState<PasswordFormValues>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdateProfile = async (data: ProfileDrawerFormValues) => {
    await dispatch(updateProfile({ fullName: data.fullName, email: data.email } as UpdateProfileRequest));
  };

  const handleChangePassword = async (data: PasswordFormValues) => {
    const result = await dispatch(
      changePassword({ currentPassword: data.currentPassword, newPassword: data.newPassword } as ChangePasswordRequest),
    );
    if (changePassword.rejected.match(result)) return false;
  };

  return (
    <BaseDrawer open={open} onClose={onClose} title={t("PROFILE_TITLE")}>
      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
        {t("PROFILE_PERSONAL_INFO")}
      </Typography>
      <BaseFormComponent<ProfileDrawerFormValues>
        formConfig={getProfileFormConfig()}
        validationSchema={getProfileValidation()}
        values={profileValues}
        onChange={setProfileValues}
        handlers={{ [BTN_SUBMIT]: handleUpdateProfile as (data: unknown) => Promise<void> }}
      />

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
        {t("PROFILE_CHANGE_PASSWORD")}
      </Typography>
      <BaseFormComponent<PasswordFormValues>
        formConfig={getPasswordFormConfig()}
        validationSchema={getPasswordValidation()}
        values={passwordValues}
        handlers={{ [BTN_SUBMIT]: handleChangePassword as (data: unknown) => Promise<void | boolean> }}
      />
    </BaseDrawer>
  );
};

export default ProfileDrawer;
