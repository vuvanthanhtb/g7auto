import * as yup from "yup";
export const serviceHistoryValidation = yup.object({
  customerId: yup.mixed().required("VALIDATION_REQUIRED_CUSTOMER"),
  contactType: yup.mixed().required("VALIDATION_REQUIRED_CONTACT_TYPE"),
  serviceDate: yup.string().required("VALIDATION_REQUIRED_SERVICE_DATE"),
});
