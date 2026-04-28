import * as yup from "yup";

export const loginValidation = yup.object({
  username: yup.string().trim().required("Tên đăng nhập là bắt buộc").min(3, "Tối thiểu 3 ký tự"),
  password: yup.string().required("Mật khẩu là bắt buộc"),
});
