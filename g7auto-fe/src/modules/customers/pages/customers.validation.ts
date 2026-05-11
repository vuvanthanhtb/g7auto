import * as yup from "yup";

export const customerValidation = yup.object({
  fullName: yup.string().trim().required("VALIDATION_REQUIRED_FULL_NAME"),
  phone: yup.string().trim().required("VALIDATION_REQUIRED_PHONE"),
});
