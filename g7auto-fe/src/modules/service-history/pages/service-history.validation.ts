import * as yup from "yup";
export const serviceHistoryValidation = yup.object({
  customerId: yup.number().required("VALIDATION_REQUIRED_CUSTOMER"),
  contactType: yup.string().required("VALIDATION_REQUIRED_CONTACT_TYPE"),
  serviceDate: yup.string().required("VALIDATION_REQUIRED_SERVICE_DATE"),
});
