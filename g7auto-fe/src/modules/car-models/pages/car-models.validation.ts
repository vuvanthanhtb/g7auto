import * as yup from "yup";

export const carModelValidation = yup.object({
  name: yup.string().trim().required("VALIDATION_REQUIRED_CAR_MODEL"),
  manufacturer: yup.string().trim().required("VALIDATION_REQUIRED_MANUFACTURER"),
});
