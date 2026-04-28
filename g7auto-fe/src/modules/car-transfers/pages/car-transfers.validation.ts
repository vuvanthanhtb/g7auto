import * as yup from "yup";
export const carTransfersValidation = yup.object({
  carId: yup.number().required("Xe là bắt buộc"),
  fromShowroomId: yup.number().required("Showroom nguồn là bắt buộc"),
  toShowroomId: yup.number().required("Showroom đích là bắt buộc"),
});
