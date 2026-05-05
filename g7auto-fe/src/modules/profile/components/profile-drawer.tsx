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

const profileFormConfig: IBaseFormConfig = {
  fields: [
    {
      type: TEXT,
      name: "username",
      label: "Tên đăng nhập",
      size: 12,
      disabled: true,
    },
    {
      type: TEXT,
      name: "fullName",
      label: "Họ và tên",
      required: true,
      size: 12,
    },
    { type: TEXT, name: "email", label: "Email", required: true, size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "Lưu thông tin", type: "submit", action: BTN_SUBMIT }],
    },
  ],
};

const profileValidation = Yup.object({
  fullName: Yup.string().required("Họ và tên không được để trống"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
});

const passwordFormConfig: IBaseFormConfig = {
  fields: [
    {
      type: TEXT,
      name: "currentPassword",
      label: "Mật khẩu hiện tại",
      required: true,
      size: 12,
      isPassword: true,
    },
    {
      type: TEXT,
      name: "newPassword",
      label: "Mật khẩu mới",
      required: true,
      size: 12,
      isPassword: true,
    },
    {
      type: TEXT,
      name: "confirmPassword",
      label: "Xác nhận mật khẩu mới",
      required: true,
      size: 12,
      isPassword: true,
    },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "Đổi mật khẩu", type: "submit", action: BTN_SUBMIT }],
    },
  ],
};

const passwordValidation = Yup.object({
  currentPassword: Yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
  newPassword: Yup.string()
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .required("Vui lòng nhập mật khẩu mới"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
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
    <BaseDrawer open={open} onClose={onClose} title="Hồ sơ cá nhân">
      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
        Thông tin cá nhân
      </Typography>
      <BaseFormComponent
        formConfig={profileFormConfig}
        validationSchema={profileValidation}
        values={profileValues}
        onChange={(d) =>
          setProfileValues((p) => ({ ...p, ...d }) as typeof profileValues)
        }
        handlers={{ [BTN_SUBMIT]: handleUpdateProfile }}
      />

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
        Đổi mật khẩu
      </Typography>
      <BaseFormComponent
        formConfig={passwordFormConfig}
        validationSchema={passwordValidation}
        values={passwordValues}
        handlers={{ [BTN_SUBMIT]: handleChangePassword }}
      />
    </BaseDrawer>
  );
};

export default ProfileDrawer;
