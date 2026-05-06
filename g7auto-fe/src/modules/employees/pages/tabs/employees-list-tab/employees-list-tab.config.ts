import {
  BTN_RESIGN,
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
} from "@/libs/constants/button.constant";
import { BUTTON, TEXT, SELECT } from "@/libs/constants/form.constant";
import {
  TBL_BUTTON,
  TBL_STRING,
  NUMERICAL_ORDER,
} from "@/libs/constants/table.constant";
import {
  defaultSelectOption,
  employeeStatusOptions as baseEmployeeStatusOptions,
} from "@/libs/constants/options.constant";
import type { BaseTableColumn, IBaseFormConfig } from "@/libs/types";
import type { EmployeeListSearchForm } from "./employees-list-tab.type";

export const getEmployeeListColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "username", label: "COMMON_LABEL_ACCOUNT", type: TBL_STRING },
  { name: "fullName", label: "COMMON_LABEL_FULL_NAME", type: TBL_STRING },
  { name: "showroomName", label: "COMMON_LABEL_SHOWROOM", type: TBL_STRING },
  { name: "phone", label: "COMMON_LABEL_PHONE", type: TBL_STRING },
  { name: "email", label: "COMMON_LABEL_EMAIL", type: TBL_STRING },
  { name: "nationalId", label: "COMMON_LABEL_NATIONAL_ID", type: TBL_STRING },
  { name: "employeeStatus", label: "COMMON_LABEL_STATUS", type: TBL_STRING },
  {
    name: "action",
    label: "COMMON_LABEL_ACTION",
    type: TBL_BUTTON,
    btnGroup: [
      {
        title: "COMMON_BTN_RESIGN",
        type: "button",
        action: BTN_RESIGN,
        style: { background: "#d32f2f", color: "#fff" },
      },
    ],
  },
];

export const employeeStatusOptions = [
  defaultSelectOption,
  ...baseEmployeeStatusOptions,
];

export const employeeListInitialValues: EmployeeListSearchForm = {
  fullName: "",
  employeeStatus: defaultSelectOption,
  page: 1,
  size: 10,
};

export const getEmployeeListSearchConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "fullName", label: "CUSTOMERS_FIELD_FULL_NAME_SEARCH", size: 3 },
    {
      type: SELECT,
      name: "employeeStatus",
      label: "COMMON_LABEL_STATUS",
      option: "employeeStatusOptions",
      size: 3,
    },
    {
      type: BUTTON,
      size: 6,
      style: { justifyContent: "flex-start" },
      childs: [
        {
          title: "COMMON_BTN_REFRESH",
          type: "button",
          action: BTN_REFRESH,
          style: { background: "#757575", color: "#fff" },
        },
        {
          title: "COMMON_BTN_SEARCH",
          type: "button",
          action: BTN_SEARCH,
          style: { background: "#1976d2", color: "#fff" },
        },
        {
          title: "COMMON_BTN_EXPORT",
          type: "button",
          action: BTN_EXPORT,
          style: { background: "#2e7d32", color: "#fff" },
        },
      ],
    },
  ],
});
