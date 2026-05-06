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

export const getCustomerColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "fullName", label: "COMMON_LABEL_FULL_NAME", type: TBL_STRING },
  { name: "phone", label: "COMMON_LABEL_PHONE", type: TBL_STRING },
  { name: "email", label: "COMMON_LABEL_EMAIL", type: TBL_STRING },
  { name: "idCard", label: "COMMON_LABEL_NATIONAL_ID", type: TBL_STRING },
  {
    name: "action",
    label: "COMMON_LABEL_ACTION",
    type: TBL_BUTTON,
    btnGroup: [{ title: "COMMON_BTN_EDIT", type: "button", action: BTN_EDIT }],
  },
];

export const getCustomerFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "fullName", label: "COMMON_LABEL_FULL_NAME", required: true, size: 12 },
    { type: TEXT, name: "phone", label: "COMMON_LABEL_PHONE", required: true, size: 6 },
    { type: TEXT, name: "email", label: "COMMON_LABEL_EMAIL", size: 6 },
    { type: TEXT, name: "idCard", label: "COMMON_LABEL_NATIONAL_ID", size: 6 },
    { type: TEXT, name: "address", label: "COMMON_LABEL_ADDRESS", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "COMMON_BTN_SAVE", type: "submit", action: BTN_SUBMIT }],
    },
  ],
});

export const customerInitialValues = {
  fullName: "",
  phone: "",
  email: "",
  idCard: "",
  address: "",
};

export const getCustomerSearchConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "fullName", label: "CUSTOMERS_FIELD_FULL_NAME_SEARCH", size: 3 },
    { type: TEXT, name: "phone", label: "CUSTOMERS_FIELD_PHONE", size: 3 },
    {
      type: BUTTON,
      size: 6,
      style: { justifyContent: "flex-start" },
      childs: [
        { title: "COMMON_BTN_REFRESH", type: "button", action: BTN_REFRESH, style: { background: "#757575", color: "#fff" } },
        { title: "COMMON_BTN_SEARCH", type: "button", action: BTN_SEARCH, style: { background: "#1976d2", color: "#fff" } },
        { title: "COMMON_BTN_EXPORT", type: "button", action: BTN_EXPORT, style: { background: "#2e7d32", color: "#fff" } },
      ],
    },
  ],
});
