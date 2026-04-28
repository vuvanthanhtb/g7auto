import * as yup from "yup";

export const customerValidation = yup.object({
  fullName: yup.string().trim().required("Họ tên là bắt buộc"),
  phone: yup.string().trim().required("Số điện thoại là bắt buộc"),
});
