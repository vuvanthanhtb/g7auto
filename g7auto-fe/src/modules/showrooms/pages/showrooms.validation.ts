import * as yup from "yup";

export const showroomValidation = yup.object({
  name: yup.string().trim().required("Tên showroom là bắt buộc"),
  address: yup.string().trim().required("Địa chỉ là bắt buộc"),
});
