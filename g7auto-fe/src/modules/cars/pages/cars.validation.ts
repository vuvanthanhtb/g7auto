import * as yup from "yup";

export const carCreateValidation = yup.object({
  chassisNumber: yup.string().trim().required("Số khung xe là bắt buộc"),
  engineNumber: yup.string().trim().required("Số máy là bắt buộc"),
  carModelId: yup.number().required("Dòng xe là bắt buộc"),
  showroomId: yup.number().required("Showroom là bắt buộc"),
});

export const carEditValidation = yup.object({});
