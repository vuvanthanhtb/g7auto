import * as yup from "yup";
export const accountsValidation = yup.object({
  username: yup.string().trim().required("Tên đăng nhập là bắt buộc").min(3, "Tối thiểu 3 ký tự"),
  role: yup.string().required("Vai trò là bắt buộc"),
});
