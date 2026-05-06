import { BTN_SUBMIT } from "@/libs/constants/button.constant";
import { BUTTON, TEXT, SELECT, DATE } from "@/libs/constants/form.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";

export const getEmployeeFormConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: TEXT,
      name: "fullName",
      label: "COMMON_LABEL_FULL_NAME",
      required: true,
      size: 12,
    },
    {
      type: TEXT,
      name: "phone",
      label: "COMMON_LABEL_PHONE",
      required: true,
      size: 6,
    },
    { type: TEXT, name: "email", label: "COMMON_LABEL_EMAIL", size: 6 },
    {
      type: TEXT,
      name: "nationalId",
      label: "EMPLOYEES_FIELD_NATIONAL_ID",
      required: true,
      size: 6,
    },
    { type: DATE, name: "birthDate", label: "EMPLOYEES_FIELD_BIRTH_DATE", size: 6 },
    {
      type: SELECT,
      name: "gender",
      label: "EMPLOYEES_FIELD_GENDER",
      option: "genderOptions",
      size: 6,
    },
    { type: DATE, name: "joinDate", label: "EMPLOYEES_FIELD_START_DATE", size: 6 },
    { type: TEXT, name: "address", label: "COMMON_LABEL_ADDRESS", size: 12 },
    {
      type: SELECT,
      name: "showroom",
      label: "COMMON_LABEL_SHOWROOM",
      required: true,
      option: "showroomOptions",
      size: 12,
    },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "COMMON_BTN_SAVE", type: "submit", action: BTN_SUBMIT }],
    },
  ],
});

export const employeeInitialValues = {
  fullName: "",
  phone: "",
  email: "",
  nationalId: "",
  address: "",
  birthDate: "",
  gender: "",
  joinDate: "",
  showroom: null,
};
