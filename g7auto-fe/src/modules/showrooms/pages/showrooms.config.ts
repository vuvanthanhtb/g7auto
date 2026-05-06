import {
  BTN_SUBMIT,
  BTN_EDIT,
  BTN_DELETE,
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
} from "@/libs/constants/button.constant";
import { BUTTON, TEXT } from "@/libs/constants/form.constant";
import {
  NUMERICAL_ORDER,
  TBL_BUTTON,
  TBL_STRING,
} from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";

export const getShowroomColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "name", label: "COMMON_LABEL_SHOWROOM_NAME", type: TBL_STRING },
  { name: "address", label: "COMMON_LABEL_ADDRESS", type: TBL_STRING },
  { name: "phone", label: "COMMON_LABEL_PHONE", type: TBL_STRING },
  {
    name: "action",
    label: "COMMON_LABEL_ACTION",
    type: TBL_BUTTON,
    btnGroup: [
      { title: "COMMON_BTN_EDIT", type: "button", action: BTN_EDIT },
      { title: "COMMON_BTN_DELETE", type: "button", action: BTN_DELETE },
    ],
  },
];

export const getShowroomFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "name", label: "SHOWROOMS_FIELD_NAME", required: true, size: 12 },
    { type: TEXT, name: "address", label: "COMMON_LABEL_ADDRESS", required: true, size: 12 },
    { type: TEXT, name: "phone", label: "COMMON_LABEL_PHONE", size: 6 },
    { type: TEXT, name: "email", label: "COMMON_LABEL_EMAIL", size: 6 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "COMMON_BTN_SAVE", type: "submit", action: BTN_SUBMIT }],
    },
  ],
});

export const showroomInitialValues = {
  name: "",
  address: "",
  phone: "",
  email: "",
};

export const getShowroomSearchConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "name", label: "SHOWROOMS_FIELD_NAME", size: 3 },
    {
      type: BUTTON,
      size: 9,
      childs: [
        { title: "COMMON_BTN_REFRESH", type: "button", action: BTN_REFRESH, style: { background: "#757575", color: "#fff" } },
        { title: "COMMON_BTN_SEARCH", type: "button", action: BTN_SEARCH, style: { background: "#1976d2", color: "#fff" } },
        { title: "COMMON_BTN_EXPORT", type: "button", action: BTN_EXPORT, style: { background: "#2e7d32", color: "#fff" } },
      ],
    },
  ],
});
