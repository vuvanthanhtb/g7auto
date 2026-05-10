import * as yup from "yup";
export const serviceHistoryValidation = yup.object({
  customerId: yup.number().required("Khách hàng là bắt buộc"),
  contactType: yup.string().required("Loại liên hệ là bắt buộc"),
  serviceDate: yup.string().required("Ngày thực hiện là bắt buộc"),
});
