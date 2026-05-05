import { BTN_SUBMIT } from "@/libs/constants/button.constant";
import { BUTTON, TEXT, SELECT, DATE } from "@/libs/constants/form.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";

export const employeeFormConfig: IBaseFormConfig = {
  fields: [
    { type: TEXT, name: "fullName", label: "Họ tên", required: true, size: 12 },
    {
      type: TEXT,
      name: "phone",
      label: "Số điện thoại",
      required: true,
      size: 6,
    },
    { type: TEXT, name: "email", label: "Email", size: 6 },
    {
      type: TEXT,
      name: "nationalId",
      label: "CCCD/CMND",
      required: true,
      size: 6,
    },
    { type: DATE, name: "birthDate", label: "Ngày sinh", size: 6 },
    {
      type: SELECT,
      name: "gender",
      label: "Giới tính",
      option: "genderOptions",
      size: 6,
    },
    { type: DATE, name: "joinDate", label: "Ngày vào làm", size: 6 },
    { type: TEXT, name: "address", label: "Địa chỉ", size: 12 },
    {
      type: SELECT,
      name: "showroom",
      label: "Showroom",
      required: true,
      option: "showroomOptions",
      size: 12,
    },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "Lưu", type: "submit", action: BTN_SUBMIT }],
    },
  ],
};

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
