import * as yup from "yup";
export const contractsValidation = yup.object({
  customerId: yup.number().required("Khách hàng là bắt buộc"),
  carId: yup.number().required("Xe là bắt buộc"),
  showroomId: yup.number().required("Showroom là bắt buộc"),
  employeeId: yup.number().required("Nhân viên là bắt buộc"),
  salePrice: yup.number().required("Giá bán là bắt buộc"),
});
