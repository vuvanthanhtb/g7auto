import {
  BTN_SUBMIT,
  BTN_EDIT,
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
} from "@/libs/constants/button.constant";
import { BUTTON, TEXT } from "@/libs/constants/form.constant";
import {
  TBL_STRING,
  TBL_BUTTON,
  NUMERICAL_ORDER,
} from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";

export const customerColumns: BaseTableColumn[] = [
  { name: "NUMERICAL_ORDER", label: "STT", type: NUMERICAL_ORDER },
  { name: "fullName", label: "Họ tên", type: TBL_STRING },
  { name: "phone", label: "Điện thoại", type: TBL_STRING },
  { name: "email", label: "Email", type: TBL_STRING },
  { name: "idCard", label: "CMND/CCCD", type: TBL_STRING },
  {
    name: "action",
    label: "Thao tác",
    type: TBL_BUTTON,
    btnGroup: [{ title: "Sửa", type: "button", action: BTN_EDIT }],
  },
];

export const customerFormConfig: IBaseFormConfig = {
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
    { type: TEXT, name: "idCard", label: "CMND/CCCD", size: 6 },
    { type: TEXT, name: "address", label: "Địa chỉ", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "Lưu", type: "submit", action: BTN_SUBMIT }],
    },
  ],
};

export const customerInitialValues = {
  fullName: "",
  phone: "",
  email: "",
  idCard: "",
  address: "",
};

export const customerSearchConfig: IBaseFormConfig = {
  fields: [
    { type: TEXT, name: "fullName", label: "Họ và tên", size: 3 },
    { type: TEXT, name: "phone", label: "Số điện thoại", size: 3 },
    {
      type: BUTTON,
      size: 6,
      style: { justifyContent: "flex-start" },
      childs: [
        {
          title: "Làm mới",
          type: "button",
          action: BTN_REFRESH,
          style: { background: "#757575", color: "#fff" },
        },
        {
          title: "Tìm kiếm",
          type: "button",
          action: BTN_SEARCH,
          style: { background: "#1976d2", color: "#fff" },
        },
        {
          title: "Xuất Excel",
          type: "button",
          action: BTN_EXPORT,
          style: { background: "#2e7d32", color: "#fff" },
        },
      ],
    },
  ],
};
