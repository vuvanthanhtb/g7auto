import * as yup from "yup";
export const paymentsValidation = yup.object({
  contractId: yup.number().required("Hợp đồng là bắt buộc"),
  amount: yup.number().required("Số tiền là bắt buộc"),
});
