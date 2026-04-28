import * as yup from "yup";
export const depositsValidation = yup.object({
  customerId: yup.number().required("Khách hàng là bắt buộc"),
  carId: yup.number().required("Xe là bắt buộc"),
  amount: yup.number().required("Số tiền cọc là bắt buộc"),
});
