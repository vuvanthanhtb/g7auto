import * as yup from "yup";

export const contractsValidation = yup.object({
  customerId: yup.number().required("VALIDATION_REQUIRED_CUSTOMER"),
  carId: yup.number().required("VALIDATION_REQUIRED_CAR"),
  signDate: yup.string().required("VALIDATION_REQUIRED_SIGN_DATE"),
  contractValue: yup.number().required("VALIDATION_REQUIRED_CONTRACT_VALUE"),
});

export const contractsUpdateValidation = yup.object({});
