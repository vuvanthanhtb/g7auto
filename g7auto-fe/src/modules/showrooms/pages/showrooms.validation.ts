import * as yup from "yup";

export const showroomValidation = yup.object({
  name: yup.string().trim().required("VALIDATION_REQUIRED_SHOWROOM"),
  address: yup.string().trim().required("VALIDATION_REQUIRED_ADDRESS"),
  phone: yup
    .string()
    .nullable()
    .transform((v) => v || null)
    .matches(/^[0-9]{9,11}$/, "VALIDATION_INVALID_PHONE"),
  email: yup
    .string()
    .nullable()
    .transform((v) => v || null)
    .email("VALIDATION_INVALID_EMAIL"),
});
