import * as yup from "yup";

export const employeeValidation = yup.object({
  fullName: yup.string().trim().required("Họ tên là bắt buộc"),
  phone: yup.string().trim().required("Số điện thoại là bắt buộc"),
  nationalId: yup.string().trim().required("CCCD/CMND là bắt buộc"),
  showroomId: yup.number().typeError("Mã showroom không hợp lệ").required("Showroom là bắt buộc"),
});
