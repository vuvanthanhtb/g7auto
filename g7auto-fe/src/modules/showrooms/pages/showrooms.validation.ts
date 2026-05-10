import * as yup from "yup";

export const showroomValidation = yup.object({
  name: yup.string().trim().required("Tên showroom là bắt buộc"),
  address: yup.string().trim().required("Địa chỉ là bắt buộc"),
  phone: yup
    .string()
    .nullable()
    .transform((v) => v || null)
    .matches(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ"),
  email: yup
    .string()
    .nullable()
    .transform((v) => v || null)
    .email("Email không hợp lệ"),
});
