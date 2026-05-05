import {
  BTN_APPROVE,
  BTN_REJECT,
  BTN_SEARCH,
  BTN_REFRESH,
} from "@/libs/constants/button.constant";
import { BUTTON, TEXT } from "@/libs/constants/form.constant";
import {
  TBL_BUTTON,
  TBL_STRING,
  NUMERICAL_ORDER,
} from "@/libs/constants/table.constant";
import type { BaseTableColumn, IBaseFormConfig } from "@/libs/types";
import type { EmployeePendingSearchForm } from "./employees-pending-tab.type";

export const employeePendingColumns: BaseTableColumn[] = [
  { name: "NUMERICAL_ORDER", label: "STT", type: NUMERICAL_ORDER },
  { name: "username", label: "Tài khoản", type: TBL_STRING },
  { name: "fullName", label: "Họ tên", type: TBL_STRING },
  {
    name: "phone",
    label: "Điện thoại",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
  { name: "showroomName", label: "Showroom", type: TBL_STRING },
  {
    name: "nationalId",
    label: "CCCD/CMND",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
  { name: "employeeStatus", label: "Hành động", type: TBL_STRING },
  {
    name: "createdAt",
    label: "Ngày yêu cầu",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
  {
    name: "action_btn",
    label: "Thao tác",
    type: TBL_BUTTON,
    btnGroup: [
      { title: "Duyệt", type: "button", action: BTN_APPROVE },
      {
        title: "Từ chối",
        type: "button",
        action: BTN_REJECT,
        style: { background: "#dc004e", color: "#fff" },
      },
    ],
  },
];

export const pendingInitialValues: EmployeePendingSearchForm = {
  fullName: "",
  page: 1,
  size: 10,
};

export const employeePendingSearchConfig: IBaseFormConfig = {
  fields: [
    { type: TEXT, name: "fullName", label: "Họ và tên", size: 4 },
    {
      type: BUTTON,
      size: 8,
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
      ],
    },
  ],
};
