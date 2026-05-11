import * as yup from "yup";
export const testDrivesValidation = yup.object({
  customerId: yup.number().required("VALIDATION_REQUIRED_CUSTOMER"),
  carId: yup.number().required("VALIDATION_REQUIRED_CAR"),
  startTime: yup.string().required("VALIDATION_REQUIRED_START_TIME"),
  endTime: yup.string().required("VALIDATION_REQUIRED_END_TIME"),
});
export const testDrivesDetailValidation = yup.object({});
