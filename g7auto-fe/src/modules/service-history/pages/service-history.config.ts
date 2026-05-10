import {
  BTN_SUBMIT,
  BTN_DETAIL,
  BTN_REFRESH,
  BTN_EXPORT,
} from "@/libs/constants/button.constant";
import {
  BUTTON,
  NUMBER_INPUT,
  TEXT,
  DATETIME,
  SELECT,
} from "@/libs/constants/form.constant";
import {
  NUMERICAL_ORDER,
  TBL_BUTTON,
  TBL_STRING,
} from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";

export const getServiceHistoryColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "customerFullName", label: "COMMON_LABEL_CUSTOMER", type: TBL_STRING },
  { name: "contactType", label: "SERVICE_HISTORY_FIELD_CONTACT_TYPE", type: TBL_STRING },
  { name: "content", label: "SERVICE_HISTORY_FIELD_CONTENT", type: TBL_STRING },
  { name: "serviceDate", label: "SERVICE_HISTORY_FIELD_DATE", type: TBL_STRING },
  {
    name: "action",
    label: "COMMON_LABEL_ACTION",
    type: TBL_BUTTON,
    btnGroup: [{ title: "COMMON_BTN_DETAIL", type: "button", action: BTN_DETAIL }],
  },
];

export const getServiceHistoryFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: NUMBER_INPUT, name: "customerId", label: "CONTRACTS_FIELD_CUSTOMER_ID", required: true, size: 6 },
    { type: NUMBER_INPUT, name: "employeeId", label: "CONTRACTS_FIELD_EMPLOYEE_ID", size: 6 },
    { type: SELECT, name: "contactType", label: "SERVICE_HISTORY_FIELD_CONTACT_TYPE", option: "contactTypeOptions", required: true, size: 6 },
    { type: DATETIME, name: "serviceDate", label: "SERVICE_HISTORY_FIELD_DATE", required: true, size: 6 },
    { type: TEXT, name: "content", label: "SERVICE_HISTORY_FIELD_CONTENT", size: 12 },
    { type: TEXT, name: "result", label: "SERVICE_HISTORY_FIELD_RESULT", size: 12 },
    { type: DATETIME, name: "nextReminderDate", label: "SERVICE_HISTORY_FIELD_NEXT_REMINDER", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "SERVICE_HISTORY_BTN_ADD", type: "submit", action: BTN_SUBMIT }],
    },
  ],
});

export const initServiceHistorySearchForm = { page: 1, size: 10 };

export const serviceHistoryInitialValues = {
  customerId: "",
  employeeId: "",
  contactType: "",
  serviceDate: "",
  content: "",
  result: "",
  nextReminderDate: "",
};

export const getServiceHistorySearchConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: BUTTON,
      size: 12,
      childs: [
        { title: "COMMON_BTN_REFRESH", type: "button", action: BTN_REFRESH, style: { background: "#757575", color: "#fff" } },
        { title: "COMMON_BTN_EXPORT", type: "button", action: BTN_EXPORT, style: { background: "#2e7d32", color: "#fff" } },
      ],
    },
  ],
});
