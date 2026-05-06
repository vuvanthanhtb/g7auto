import { BTN_SEARCH, BTN_REFRESH } from "@/libs/constants/button.constant";
import { BUTTON, TEXT } from "@/libs/constants/form.constant";
import { TBL_STRING, NUMERICAL_ORDER } from "@/libs/constants/table.constant";
import type { BaseTableColumn, IBaseFormConfig } from "@/libs/types";
import type { EmployeeApprovedSearchForm } from "./employees-approved-tab.type";

export const getEmployeeApprovedColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "username", label: "COMMON_LABEL_ACCOUNT", type: TBL_STRING },
  { name: "fullName", label: "COMMON_LABEL_FULL_NAME", type: TBL_STRING },
  { name: "phone", label: "COMMON_LABEL_PHONE", type: TBL_STRING },
  { name: "showroomName", label: "COMMON_LABEL_SHOWROOM", type: TBL_STRING },
  { name: "nationalId", label: "COMMON_LABEL_NATIONAL_ID", type: TBL_STRING },
  { name: "employeeStatus", label: "COMMON_LABEL_STATUS", type: TBL_STRING },
  {
    name: "createdAt",
    label: "COMMON_LABEL_CREATED_AT",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
  {
    name: "updatedAt",
    label: "COMMON_LABEL_APPROVED_AT",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
];

export const approvedInitialValues: EmployeeApprovedSearchForm = {
  fullName: "",
  page: 1,
  size: 10,
};

export const getEmployeeApprovedSearchConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "fullName", label: "CUSTOMERS_FIELD_FULL_NAME_SEARCH", size: 4 },
    {
      type: BUTTON,
      size: 8,
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
      ],
    },
  ],
});
