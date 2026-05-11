import * as yup from "yup";

export const carTransfersValidation = yup.object({
  carId: yup.number().required("VALIDATION_REQUIRED_CAR"),
  fromShowroomId: yup.number().required("VALIDATION_REQUIRED_FROM_SHOWROOM"),
  toShowroomId: yup.number().required("VALIDATION_REQUIRED_TO_SHOWROOM"),
  reason: yup.string().trim().required("VALIDATION_REQUIRED_REASON"),
});
