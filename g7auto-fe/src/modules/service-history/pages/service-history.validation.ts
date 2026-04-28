import * as yup from "yup";
export const serviceHistoryValidation = yup.object({
  carId: yup.number().required("Xe là bắt buộc"),
  showroomId: yup.number().required("Showroom là bắt buộc"),
  serviceType: yup.string().trim().required("Loại dịch vụ là bắt buộc"),
});
