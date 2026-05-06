import { BTN_SEARCH, BTN_REFRESH } from "@/libs/constants/button.constant";
import { BUTTON, TEXT } from "@/libs/constants/form.constant";
import { TBL_STRING, NUMERICAL_ORDER } from "@/libs/constants/table.constant";
import type { BaseTableColumn, IBaseFormConfig } from "@/libs/types";
import type { EmployeeApprovedSearchForm } from "./employees-approved-tab.type";

export const getEmployeeApprovedColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "LABEL_STT", type: NUMERICAL_ORDER },
  { name: "username", label: "LABEL_ACCOUNT", type: TBL_STRING },
  { name: "fullName", label: "LABEL_FULL_NAME", type: TBL_STRING },
  { name: "phone", label: "LABEL_PHONE", type: TBL_STRING },
  { name: "showroomName", label: "LABEL_SHOWROOM", type: TBL_STRING },
  { name: "nationalId", label: "LABEL_NATIONAL_ID", type: TBL_STRING },
  { name: "employeeStatus", label: "LABEL_STATUS", type: TBL_STRING },
  {
    name: "createdAt",
    label: "LABEL_CREATED_AT",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
  {
    name: "updatedAt",
    label: "LABEL_APPROVED_AT",
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
    { type: TEXT, name: "fullName", label: "FIELD_FULL_NAME_SEARCH", size: 4 },
    {
      type: BUTTON,
      size: 8,
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
      ],
    },
  ],
});
