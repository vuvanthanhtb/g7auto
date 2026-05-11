import * as yup from "yup";
export const quotationsValidation = yup.object({
  customerId: yup.number().required("VALIDATION_REQUIRED_CUSTOMER"),
  carId: yup.number().required("VALIDATION_REQUIRED_CAR"),
});
export const quotationsDetailValidation = yup.object({});
