import { BTN_SEARCH, BTN_REFRESH } from "@/libs/constants/button.constant";
import { BUTTON, TEXT } from "@/libs/constants/form.constant";
import { TBL_STRING, NUMERICAL_ORDER } from "@/libs/constants/table.constant";
import type { BaseTableColumn, IBaseFormConfig } from "@/libs/types";
import type { EmployeeApprovedSearchForm } from "./employees-approved-tab.type";

export const employeeApprovedColumns: BaseTableColumn[] = [
  { name: "NUMERICAL_ORDER", label: "STT", type: NUMERICAL_ORDER },
  { name: "username", label: "Tài khoản", type: TBL_STRING },
  { name: "fullName", label: "Họ tên", type: TBL_STRING },
  { name: "phone", label: "Điện thoại", type: TBL_STRING },
  { name: "showroomName", label: "Showroom", type: TBL_STRING },
  { name: "nationalId", label: "CCCD/CMND", type: TBL_STRING },
  { name: "employeeStatus", label: "Trạng thái", type: TBL_STRING },
  {
    name: "createdAt",
    label: "Ngày tạo",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
  {
    name: "updatedAt",
    label: "Ngày duyệt",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
];

export const approvedInitialValues: EmployeeApprovedSearchForm = {
  fullName: "",
  page: 1,
  size: 10,
};

export const employeeApprovedSearchConfig: IBaseFormConfig = {
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
