import * as yup from "yup";
export const testDrivesValidation = yup.object({
  customerId: yup.number().required("Khách hàng là bắt buộc"),
  carId: yup.number().required("Xe là bắt buộc"),
  showroomId: yup.number().required("Showroom là bắt buộc"),
  startTime: yup.string().required("Thời gian bắt đầu là bắt buộc"),
});
