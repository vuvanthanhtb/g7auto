import * as yup from "yup";
export const accountsValidation = yup.object({
  username: yup.string().trim().required("VALIDATION_REQUIRED_USERNAME").min(3, "VALIDATION_MIN_3_CHAR"),
  role: yup.string().required("VALIDATION_REQUIRED_ROLE"),
});
