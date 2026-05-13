import * as yup from "yup";
export const paymentsValidation = yup.object({
  contractId: yup.mixed().required("VALIDATION_REQUIRED_CONTRACT"),
  amount: yup.number().required("VALIDATION_REQUIRED_AMOUNT"),
  method: yup.mixed().required("VALIDATION_REQUIRED_PAYMENT_METHOD"),
});
export const paymentsDetailValidation = yup.object({});
