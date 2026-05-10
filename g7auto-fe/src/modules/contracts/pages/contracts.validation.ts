import * as yup from "yup";

export const contractsValidation = yup.object({
  customerId: yup.number().required("Khách hàng là bắt buộc"),
  carId: yup.number().required("Xe là bắt buộc"),
  signDate: yup.string().required("Ngày ký là bắt buộc"),
  contractValue: yup.number().required("Giá trị hợp đồng là bắt buộc"),
});

export const contractsUpdateValidation = yup.object({});
