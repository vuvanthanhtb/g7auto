import { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import { updateProfile, changePassword } from "@/modules/auth/shell/auth.slice";
import BaseFormComponent from "@/libs/components/ui/base-form";
import { TEXT, BUTTON } from "@/libs/constants/form.constant";
import { BTN_SUBMIT } from "@/libs/constants/button.constant";
import { t } from "@/libs/i18n";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type {
  UpdateProfileRequest,
  ChangePasswordRequest,
} from "@/modules/auth/shell/auth.type";
import * as Yup from "yup";

const getProfileFormConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: TEXT,
      name: "fullName",
      label: "PROFILE_FIELD_FULL_NAME",
      required: true,
      size: 12,
    },
    {
      type: TEXT,
      name: "email",
      label: "COMMON_LABEL_EMAIL",
      required: true,
      size: 12,
    },
    {
      type: BUTTON,
      size: 12,
      childs: [
        {
          title: "PROFILE_BTN_SAVE_INFO",
          type: "submit",
          action: BTN_SUBMIT,
        },
      ],
    },
  ],
});

const profileValidation = Yup.object({
  fullName: Yup.string().required(t("PROFILE_VALIDATION_FULL_NAME_REQUIRED")),
  email: Yup.string()
    .email(t("PROFILE_VALIDATION_EMAIL_INVALID"))
    .required(t("PROFILE_VALIDATION_EMAIL_REQUIRED")),
});

const getPasswordFormConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: TEXT,
      name: "currentPassword",
      label: "PROFILE_FIELD_CURRENT_PASSWORD",
      required: true,
      size: 12,
      isPassword: true,
    },
    {
      type: TEXT,
      name: "newPassword",
      label: "PROFILE_FIELD_NEW_PASSWORD",
      required: true,
      size: 12,
      isPassword: true,
    },
    {
      type: TEXT,
      name: "confirmPassword",
      label: "PROFILE_FIELD_CONFIRM_PASSWORD",
      required: true,
      size: 12,
      isPassword: true,
    },
    {
      type: BUTTON,
      size: 12,
      childs: [
        {
          title: "PROFILE_BTN_CHANGE_PASSWORD",
          type: "submit",
          action: BTN_SUBMIT,
        },
      ],
    },
  ],
});

const passwordValidation = Yup.object({
  currentPassword: Yup.string().required(
    t("PROFILE_VALIDATION_CURRENT_PASSWORD_REQUIRED"),
  ),
  newPassword: Yup.string()
    .min(6, t("PROFILE_VALIDATION_NEW_PASSWORD_MIN"))
    .required(t("PROFILE_VALIDATION_NEW_PASSWORD_REQUIRED")),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], t("PROFILE_VALIDATION_CONFIRM_PASSWORD_MATCH"))
    .required(t("PROFILE_VALIDATION_CONFIRM_PASSWORD_REQUIRED")),
});

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  const [profileValues, setProfileValues] = useState({
    fullName: user?.fullName ?? "",
    email: user?.email ?? "",
  });

  const [passwordValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdateProfile = async (data: Record<string, unknown>) => {
    await dispatch(updateProfile(data as unknown as UpdateProfileRequest));
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

  const displayName = user?.fullName ?? user?.username ?? t("HOME_DEFAULT_NAME");

  return (
    <Box sx={{ p: 3, maxWidth: 720, mx: "auto" }}>
      <Typography
        variant="h6"
        fontWeight={700}
        className="page-title"
        sx={{ mb: 3 }}
      >
        {t("PROFILE_TITLE")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Avatar
                sx={{ width: 56, height: 56, fontSize: 22, bgcolor: "#1a73e8" }}
              >
                {displayName.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography fontWeight={600}>{displayName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.username}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Typography fontWeight={600} sx={{ mb: 2 }}>
              {t("PROFILE_PERSONAL_INFO")}
            </Typography>
            <BaseFormComponent
              formConfig={getProfileFormConfig()}
              validationSchema={profileValidation}
              values={profileValues}
              onChange={(d) =>
                setProfileValues(
                  (p) => ({ ...p, ...d }) as typeof profileValues,
                )
              }
              handlers={{ [BTN_SUBMIT]: handleUpdateProfile }}
            />
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography fontWeight={600} sx={{ mb: 2 }}>
              {t("PROFILE_CHANGE_PASSWORD")}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <BaseFormComponent
              formConfig={getPasswordFormConfig()}
              validationSchema={passwordValidation}
              values={passwordValues}
              handlers={{ [BTN_SUBMIT]: handleChangePassword }}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ProfilePage;
