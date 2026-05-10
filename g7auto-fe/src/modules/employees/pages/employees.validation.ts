import * as yup from "yup";

export const employeeValidation = yup.object({
  fullName: yup.string().trim().required("COMMON_REQUIRED_FULL_NAME"),
  phone: yup.string().trim().required("COMMON_REQUIRED_PHONE"),
  nationalId: yup.string().trim().required("EMPLOYEES_FIELD_NATIONAL_ID"),
  showroom: yup
    .object({ value: yup.number() })
    .nullable()
    .required("COMMON_REQUIRED_SHOWROOM"),
});
