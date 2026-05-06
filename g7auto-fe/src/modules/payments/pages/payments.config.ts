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
} from "@/libs/constants/form.constant";
import {
  NUMERICAL_ORDER,
  TBL_BUTTON,
  TBL_STRING,
} from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";

export const getPaymentColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "code", label: "COMMON_LABEL_PAYMENT_CODE", type: TBL_STRING },
  { name: "contractCode", label: "COMMON_LABEL_CONTRACT_REF", type: TBL_STRING },
  { name: "customerName", label: "COMMON_LABEL_CUSTOMER", type: TBL_STRING },
  { name: "amount", label: "COMMON_LABEL_AMOUNT", type: TBL_STRING },
  { name: "status", label: "COMMON_LABEL_STATUS", type: TBL_STRING },
  {
    name: "action",
    label: "COMMON_LABEL_ACTION",
    type: TBL_BUTTON,
    btnGroup: [{ title: "COMMON_BTN_DETAIL", type: "button", action: BTN_DETAIL }],
  },
];

export const getPaymentsFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: NUMBER_INPUT, name: "contractId", label: "PAYMENTS_FIELD_CONTRACT_ID", required: true, size: 12 },
    { type: NUMBER_INPUT, name: "amount", label: "PAYMENTS_FIELD_AMOUNT", required: true, size: 6 },
    { type: TEXT, name: "paymentMethod", label: "PAYMENTS_FIELD_METHOD", size: 6 },
    { type: DATETIME, name: "paymentTime", label: "PAYMENTS_FIELD_TIME", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "PAYMENTS_BTN_CREATE", type: "submit", action: BTN_SUBMIT }],
    },
  ],
});

export const paymentsInitialValues = {
  contractId: "",
  amount: "",
  paymentMethod: "",
  paymentTime: "",
};

export const getPaymentSearchConfig = (): IBaseFormConfig => ({
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
