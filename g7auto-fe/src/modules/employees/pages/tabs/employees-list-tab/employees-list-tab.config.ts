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

export const employeeListColumns: BaseTableColumn[] = [
  { name: "NUMERICAL_ORDER", label: "STT", type: NUMERICAL_ORDER },
  { name: "username", label: "Tài khoản", type: TBL_STRING },
  { name: "fullName", label: "Họ tên", type: TBL_STRING },
  { name: "showroomName", label: "Showroom", type: TBL_STRING },
  { name: "phone", label: "Điện thoại", type: TBL_STRING },
  { name: "email", label: "Email", type: TBL_STRING },
  { name: "nationalId", label: "CCCD/CMND", type: TBL_STRING },
  { name: "employeeStatus", label: "Trạng thái", type: TBL_STRING },
  {
    name: "action",
    label: "Thao tác",
    type: TBL_BUTTON,
    btnGroup: [
      {
        title: "Nghỉ việc",
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

export const employeeListSearchConfig: IBaseFormConfig = {
  fields: [
    { type: TEXT, name: "fullName", label: "Họ và tên", size: 3 },
    {
      type: SELECT,
      name: "employeeStatus",
      label: "Trạng thái",
      option: "employeeStatusOptions",
      size: 3,
    },
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
