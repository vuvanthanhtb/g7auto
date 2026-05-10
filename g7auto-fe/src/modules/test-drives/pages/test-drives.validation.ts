import * as yup from "yup";
export const testDrivesValidation = yup.object({
  customerId: yup.number().required("Khách hàng là bắt buộc"),
  carId: yup.number().required("Xe là bắt buộc"),
  startTime: yup.string().required("Thời gian bắt đầu là bắt buộc"),
  endTime: yup.string().required("Thời gian kết thúc là bắt buộc"),
});
export const testDrivesDetailValidation = yup.object({});
