import {
  BTN_SUBMIT,
  BTN_DETAIL,
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
} from "@/libs/constants/button.constant";
import {
  BUTTON,
  NUMBER_INPUT,
  DATE,
  SELECT,
} from "@/libs/constants/form.constant";
import {
  NUMERICAL_ORDER,
  TBL_BUTTON,
  TBL_STRING,
} from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";

export const getDepositColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "code", label: "COMMON_LABEL_DEPOSIT_CODE", type: TBL_STRING },
  { name: "customerName", label: "COMMON_LABEL_CUSTOMER", type: TBL_STRING },
  { name: "carName", label: "COMMON_LABEL_CAR", type: TBL_STRING },
  { name: "amount", label: "COMMON_LABEL_AMOUNT", type: TBL_STRING },
  { name: "status", label: "COMMON_LABEL_STATUS", type: TBL_STRING },
  {
    name: "action",
    label: "COMMON_LABEL_ACTION",
    type: TBL_BUTTON,
    btnGroup: [{ title: "COMMON_BTN_DETAIL", type: "button", action: BTN_DETAIL }],
  },
];

export const getDepositsFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: NUMBER_INPUT, name: "customerId", label: "CONTRACTS_FIELD_CUSTOMER_ID", required: true, size: 6 },
    { type: NUMBER_INPUT, name: "carId", label: "CONTRACTS_FIELD_CAR_ID", required: true, size: 6 },
    { type: NUMBER_INPUT, name: "showroomId", label: "CARS_FIELD_SHOWROOM_ID", required: true, size: 6 },
    { type: NUMBER_INPUT, name: "employeeId", label: "CONTRACTS_FIELD_EMPLOYEE_ID", required: true, size: 6 },
    { type: NUMBER_INPUT, name: "amount", label: "DEPOSITS_FIELD_AMOUNT", required: true, size: 12 },
    { type: DATE, name: "depositDate", label: "DEPOSITS_FIELD_DATE", size: 6 },
    { type: DATE, name: "expiredDate", label: "DEPOSITS_FIELD_EXPIRED_DATE", size: 6 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "DEPOSITS_BTN_CREATE_ORDER", type: "submit", action: BTN_SUBMIT }],
    },
  ],
});

export const depositsInitialValues = {
  customerId: "",
  carId: "",
  showroomId: "",
  employeeId: "",
  amount: "",
  depositDate: "",
  expiredDate: "",
};

export const getDepositSearchConfig = (): IBaseFormConfig => ({
  fields: [
    { type: SELECT, name: "status", label: "COMMON_LABEL_STATUS", option: "depositStatusOptions", size: 3 },
    {
      type: BUTTON,
      size: 9,
      childs: [
        { title: "COMMON_BTN_REFRESH", type: "button", action: BTN_REFRESH, style: { background: "#757575", color: "#fff" } },
        { title: "COMMON_BTN_SEARCH", type: "button", action: BTN_SEARCH, style: { background: "#1976d2", color: "#fff" } },
        { title: "COMMON_BTN_EXPORT", type: "button", action: BTN_EXPORT, style: { background: "#2e7d32", color: "#fff" } },
      ],
    },
  ],
});
