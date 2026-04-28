import * as yup from "yup";

export const carValidation = yup.object({
  licensePlate: yup.string().trim().required("Biển số là bắt buộc"),
  carModelId: yup.number().required("Dòng xe là bắt buộc"),
  showroomId: yup.number().required("Showroom là bắt buộc"),
});
