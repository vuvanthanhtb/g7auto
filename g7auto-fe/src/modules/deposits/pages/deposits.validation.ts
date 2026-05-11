import * as yup from "yup";

export const depositsValidation = yup.object({
  customerId: yup.number().required("VALIDATION_REQUIRED_CUSTOMER"),
  carId: yup.number().required("VALIDATION_REQUIRED_CAR"),
  amount: yup.number().required("VALIDATION_REQUIRED_DEPOSIT_AMOUNT"),
  depositPaymentMethod: yup.string().required("VALIDATION_REQUIRED_PAYMENT_METHOD"),
});
