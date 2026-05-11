import * as yup from "yup";

export const loginValidation = yup.object({
  username: yup
    .string()
    .trim()
    .required("VALIDATION_REQUIRED_USERNAME")
    .min(3, "VALIDATION_MIN_3_CHAR"),
  password: yup.string().required("VALIDATION_REQUIRED_PASSWORD"),
});
