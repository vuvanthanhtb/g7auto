import {
  BTN_SUBMIT,
  BTN_DETAIL,
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_SEND,
  BTN_ACCEPT,
  BTN_CANCEL,
} from "@/libs/constants/button.constant";
import {
  BUTTON,
  NUMBER_INPUT,
  TEXT,
  SELECT,
} from "@/libs/constants/form.constant";
import {
  NUMERICAL_ORDER,
  TBL_BUTTON,
  TBL_STRING,
  TBL_NUMBER,
} from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";

export const getQuotationColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "customerFullName", label: "COMMON_LABEL_CUSTOMER", type: TBL_STRING },
  { name: "carChassisNumber", label: "CARS_FIELD_CHASSIS_NUMBER", type: TBL_STRING },
  { name: "totalAmount", label: "QUOTATIONS_FIELD_TOTAL_AMOUNT", type: TBL_NUMBER },
  { name: "status", label: "COMMON_LABEL_STATUS", type: TBL_STRING },
  {
    name: "action",
    label: "COMMON_LABEL_ACTION",
    type: TBL_BUTTON,
    btnGroup: [
      { title: "COMMON_BTN_DETAIL", type: "button", action: BTN_DETAIL },
    ],
  },
];

export const getQuotationsFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: NUMBER_INPUT, name: "customerId", label: "CONTRACTS_FIELD_CUSTOMER_ID", required: true, size: 6 },
    { type: NUMBER_INPUT, name: "carId", label: "CONTRACTS_FIELD_CAR_ID", required: true, size: 6 },
    { type: NUMBER_INPUT, name: "employeeId", label: "CONTRACTS_FIELD_EMPLOYEE_ID", size: 6 },
    { type: NUMBER_INPUT, name: "carPrice", label: "QUOTATIONS_FIELD_CAR_PRICE", size: 6 },
    { type: NUMBER_INPUT, name: "accessories", label: "QUOTATIONS_FIELD_ACCESSORIES", size: 4 },
    { type: NUMBER_INPUT, name: "promotion", label: "QUOTATIONS_FIELD_PROMOTION", size: 4 },
    { type: NUMBER_INPUT, name: "otherCosts", label: "QUOTATIONS_FIELD_OTHER_COSTS", size: 4 },
    { type: TEXT, name: "notes", label: "CONTRACTS_FIELD_NOTES", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [
        { title: "QUOTATIONS_BTN_CREATE", type: "submit", action: BTN_SUBMIT },
      ],
    },
  ],
});

export const getQuotationsDetailFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "notes", label: "CONTRACTS_FIELD_NOTES", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [
        { title: "QUOTATIONS_BTN_SEND", type: "button", action: BTN_SEND, style: { background: "#1976d2", color: "#fff" } },
        { title: "QUOTATIONS_BTN_ACCEPT", type: "button", action: BTN_ACCEPT, style: { background: "#2e7d32", color: "#fff" } },
        { title: "QUOTATIONS_BTN_CANCEL", type: "button", action: BTN_CANCEL, style: { background: "#d32f2f", color: "#fff" } },
      ],
    },
  ],
});

export const initQuotationSearchForm = { status: "", page: 1, size: 10 };

export const quotationsInitialValues = {
  customerId: "",
  carId: "",
  employeeId: "",
  carPrice: "",
  accessories: "",
  promotion: "",
  otherCosts: "",
  notes: "",
};

export const getQuotationSearchConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: SELECT,
      name: "status",
      label: "COMMON_LABEL_STATUS",
      option: "quotationStatusOptions",
      size: 3,
    },
    {
      type: BUTTON,
      size: 9,
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
