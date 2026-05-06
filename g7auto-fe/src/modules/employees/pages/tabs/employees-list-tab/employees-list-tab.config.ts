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
  { name: "NUMERICAL_ORDER", label: "LABEL_STT", type: NUMERICAL_ORDER },
  { name: "username", label: "LABEL_ACCOUNT", type: TBL_STRING },
  { name: "fullName", label: "LABEL_FULL_NAME", type: TBL_STRING },
  { name: "showroomName", label: "LABEL_SHOWROOM", type: TBL_STRING },
  { name: "phone", label: "LABEL_PHONE", type: TBL_STRING },
  { name: "email", label: "LABEL_EMAIL", type: TBL_STRING },
  { name: "nationalId", label: "LABEL_NATIONAL_ID", type: TBL_STRING },
  { name: "employeeStatus", label: "LABEL_STATUS", type: TBL_STRING },
  {
    name: "action",
    label: "LABEL_ACTION",
    type: TBL_BUTTON,
    btnGroup: [
      {
        title: "BTN_RESIGN_ACTION",
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
    { type: TEXT, name: "fullName", label: "FIELD_FULL_NAME_SEARCH", size: 3 },
    {
      type: SELECT,
      name: "employeeStatus",
      label: "LABEL_STATUS",
      option: "employeeStatusOptions",
      size: 3,
    },
    {
      type: BUTTON,
      size: 6,
      style: { justifyContent: "flex-start" },
      childs: [
        {
          title: "BTN_REFRESH_ACTION",
          type: "button",
          action: BTN_REFRESH,
          style: { background: "#757575", color: "#fff" },
        },
        {
          title: "BTN_SEARCH_ACTION",
          type: "button",
          action: BTN_SEARCH,
          style: { background: "#1976d2", color: "#fff" },
        },
        {
          title: "BTN_EXPORT_EXCEL",
          type: "button",
          action: BTN_EXPORT,
          style: { background: "#2e7d32", color: "#fff" },
        },
      ],
    },
  ],
});
