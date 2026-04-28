import * as yup from "yup";
export const quotationsValidation = yup.object({
  customerId: yup.number().required("Khách hàng là bắt buộc"),
  carId: yup.number().required("Xe là bắt buộc"),
  quotedPrice: yup.number().required("Giá báo là bắt buộc"),
});
