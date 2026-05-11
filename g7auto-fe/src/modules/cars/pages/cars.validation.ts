import * as yup from "yup";

export const carCreateValidation = yup.object({
  chassisNumber: yup.string().trim().required("VALIDATION_REQUIRED_CHASSIS_NUMBER"),
  engineNumber: yup.string().trim().required("VALIDATION_REQUIRED_ENGINE_NUMBER"),
  carModelId: yup.number().required("VALIDATION_REQUIRED_CAR_MODEL"),
  showroomId: yup.number().required("VALIDATION_REQUIRED_SHOWROOM"),
});

export const carEditValidation = yup.object({});
