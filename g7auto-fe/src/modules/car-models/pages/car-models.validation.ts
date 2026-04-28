import * as yup from "yup";

export const carModelValidation = yup.object({
  name: yup.string().trim().required("Tên dòng xe là bắt buộc"),
  manufacturer: yup.string().trim().required("Hãng sản xuất là bắt buộc"),
});
