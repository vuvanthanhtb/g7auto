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

export const getEmployeePendingColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "LABEL_STT", type: NUMERICAL_ORDER },
  { name: "username", label: "LABEL_ACCOUNT", type: TBL_STRING },
  { name: "fullName", label: "LABEL_FULL_NAME", type: TBL_STRING },
  {
    name: "phone",
    label: "LABEL_PHONE",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
  { name: "showroomName", label: "LABEL_SHOWROOM", type: TBL_STRING },
  {
    name: "nationalId",
    label: "LABEL_NATIONAL_ID",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
  { name: "employeeStatus", label: "LABEL_ACTION_TYPE", type: TBL_STRING },
  {
    name: "createdAt",
    label: "LABEL_REQUEST_DATE",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
  {
    name: "action_btn",
    label: "LABEL_ACTION",
    type: TBL_BUTTON,
    btnGroup: [
      { title: "BTN_APPROVE_ACTION", type: "button", action: BTN_APPROVE },
      {
        title: "BTN_REJECT_ACTION",
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

export const getEmployeePendingSearchConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: TEXT,
      name: "fullName",
      label: "FIELD_FULL_NAME_SEARCH",
      size: 4,
    },
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
