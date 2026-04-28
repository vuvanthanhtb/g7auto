import * as yup from "yup";

export const employeeValidation = yup.object({
  fullName: yup.string().trim().required("Họ tên là bắt buộc"),
});
