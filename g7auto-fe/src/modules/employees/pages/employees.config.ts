import { BTN_SUBMIT } from "@/libs/constants/button.constant";
import { BUTTON, TEXT, SELECT, DATE } from "@/libs/constants/form.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";

export const getEmployeeFormConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: TEXT,
      name: "fullName",
      label: "FIELD_FULL_NAME",
      required: true,
      size: 12,
    },
    {
      type: TEXT,
      name: "phone",
      label: "FIELD_PHONE",
      required: true,
      size: 6,
    },
    { type: TEXT, name: "email", label: "LABEL_EMAIL", size: 6 },
    {
      type: TEXT,
      name: "nationalId",
      label: "FIELD_NATIONAL_ID_EMP",
      required: true,
      size: 6,
    },
    { type: DATE, name: "birthDate", label: "FIELD_BIRTH_DATE", size: 6 },
    {
      type: SELECT,
      name: "gender",
      label: "FIELD_GENDER",
      option: "genderOptions",
      size: 6,
    },
    { type: DATE, name: "joinDate", label: "FIELD_START_DATE", size: 6 },
    { type: TEXT, name: "address", label: "FIELD_ADDRESS", size: 12 },
    {
      type: SELECT,
      name: "showroom",
      label: "LABEL_SHOWROOM",
      required: true,
      option: "showroomOptions",
      size: 12,
    },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "BTN_SAVE", type: "submit", action: BTN_SUBMIT }],
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
