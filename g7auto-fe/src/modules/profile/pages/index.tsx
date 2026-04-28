import { useState } from "react";
import { Avatar, Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import { updateProfile, changePassword } from "@/modules/auth/shell/auth.slice";
import BaseFormComponent from "@/libs/components/ui/base-form";
import { TEXT, BUTTON } from "@/libs/constants/form.constant";
import { BTN_SUBMIT } from "@/libs/constants/button.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { UpdateProfileRequest, ChangePasswordRequest } from "@/modules/auth/shell/auth.type";
import * as Yup from "yup";

const profileFormConfig: IBaseFormConfig = {
  fields: [
    { type: TEXT, name: "fullName", label: "Họ và tên", required: true, size: 12 },
    { type: TEXT, name: "email", label: "Email", required: true, size: 12 },
    {
      type: BUTTON, size: 12,
      childs: [{ title: "Lưu thông tin", type: "submit", action: BTN_SUBMIT }],
    },
  ],
};

const profileValidation = Yup.object({
  fullName: Yup.string().required("Họ và tên không được để trống"),
  email: Yup.string().email("Email không hợp lệ").required("Email không được để trống"),
});

const passwordFormConfig: IBaseFormConfig = {
  fields: [
    { type: TEXT, name: "currentPassword", label: "Mật khẩu hiện tại", required: true, size: 12, isPassword: true },
    { type: TEXT, name: "newPassword", label: "Mật khẩu mới", required: true, size: 12, isPassword: true },
    { type: TEXT, name: "confirmPassword", label: "Xác nhận mật khẩu", required: true, size: 12, isPassword: true },
    {
      type: BUTTON, size: 12,
      childs: [{ title: "Đổi mật khẩu", type: "submit", action: BTN_SUBMIT }],
    },
  ],
};

const passwordValidation = Yup.object({
  currentPassword: Yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
  newPassword: Yup.string().min(6, "Mật khẩu tối thiểu 6 ký tự").required("Vui lòng nhập mật khẩu mới"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
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

  const displayName = user?.fullName ?? user?.username ?? "User";

  return (
    <Box sx={{ p: 3, maxWidth: 720, mx: "auto" }}>
      <Typography variant="h6" fontWeight={700} className="page-title" sx={{ mb: 3 }}>
        Hồ sơ cá nhân
      </Typography>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Avatar sx={{ width: 56, height: 56, fontSize: 22, bgcolor: "#1a73e8" }}>
                {displayName.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography fontWeight={600}>{displayName}</Typography>
                <Typography variant="body2" color="text.secondary">{user?.username}</Typography>
              </Box>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <BaseFormComponent
              formConfig={profileFormConfig}
              validationSchema={profileValidation}
              values={profileValues}
              onChange={(d) => setProfileValues((p) => ({ ...p, ...d } as typeof profileValues))}
              handlers={{ [BTN_SUBMIT]: handleUpdateProfile }}
            />
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography fontWeight={600} sx={{ mb: 2 }}>Đổi mật khẩu</Typography>
            <Divider sx={{ mb: 2 }} />
            <BaseFormComponent
              formConfig={passwordFormConfig}
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
