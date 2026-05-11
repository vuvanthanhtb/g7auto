import {
  BTN_SUBMIT,
  BTN_DETAIL,
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_CONFIRM,
  BTN_CANCEL,
  BTN_SEARCH,
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
  TBL_NUMBER,
} from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";

export const getPaymentColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "contractNumber", label: "CONTRACTS_FIELD_CONTRACT_NUMBER", type: TBL_STRING },
  { name: "installmentNumber", label: "PAYMENTS_FIELD_INSTALLMENT", type: TBL_STRING },
  { name: "amount", label: "PAYMENTS_FIELD_AMOUNT", type: TBL_NUMBER },
  { name: "method", label: "PAYMENTS_FIELD_METHOD", type: TBL_STRING },
  { name: "status", label: "COMMON_LABEL_STATUS", type: TBL_STRING },
  {
    name: "action",
    label: "COMMON_LABEL_ACTION",
    type: TBL_BUTTON,
    btnGroup: [{ title: "COMMON_BTN_DETAIL", type: "button", action: BTN_DETAIL }],
  },
];

const isBankTransfer = (values: Record<string, unknown>) =>
  (values.method as { value?: string } | null)?.value === "BANK_TRANSFER";

export const getPaymentsFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: NUMBER_INPUT, name: "contractId", label: "PAYMENTS_FIELD_CONTRACT_ID", required: true, size: 12 },
    { type: NUMBER_INPUT, name: "amount", label: "PAYMENTS_FIELD_AMOUNT", required: true, size: 6 },
    { type: SELECT, name: "method", label: "PAYMENTS_FIELD_METHOD", option: "paymentMethodOptions", required: true, size: 6 },
    { type: SELECT, name: "bankId", label: "PAYMENTS_FIELD_BANK", option: "vietnameseBankOptions", required: true, size: 12, visibleWhen: isBankTransfer },
    { type: TEXT, name: "bankAccountNo", label: "PAYMENTS_FIELD_BANK_ACCOUNT_NO", required: true, size: 6, visibleWhen: isBankTransfer },
    { type: TEXT, name: "bankContent", label: "PAYMENTS_FIELD_BANK_CONTENT", size: 6, visibleWhen: isBankTransfer },
    { type: DATETIME, name: "paymentTime", label: "PAYMENTS_FIELD_TIME", size: 6 },
    { type: NUMBER_INPUT, name: "collectorId", label: "PAYMENTS_FIELD_COLLECTOR_ID", size: 6 },
    { type: TEXT, name: "transactionCode", label: "PAYMENTS_FIELD_TRANSACTION_CODE", size: 12 },
    { type: TEXT, name: "notes", label: "CONTRACTS_FIELD_NOTES", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "PAYMENTS_BTN_CREATE", type: "submit", action: BTN_SUBMIT }],
    },
  ],
});

export const getPaymentsDetailFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "notes", label: "CONTRACTS_FIELD_NOTES", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [
        { title: "PAYMENTS_BTN_CONFIRM", type: "button", action: BTN_CONFIRM, style: { background: "#2e7d32", color: "#fff" } },
        { title: "PAYMENTS_BTN_CANCEL", type: "button", action: BTN_CANCEL, style: { background: "#d32f2f", color: "#fff" } },
      ],
    },
  ],
});

export const initPaymentSearchForm = { status: "", page: 1, size: 10 };

export const paymentsInitialValues = {
  contractId: "",
  amount: "",
  method: "",
  bankId: "",
  bankAccountNo: "",
  bankContent: "",
  paymentTime: "",
  collectorId: "",
  transactionCode: "",
  notes: "",
};

export const getPaymentSearchConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: SELECT,
      name: "status",
      label: "COMMON_LABEL_STATUS",
      option: "paymentStatusOptions",
      size: 3,
    },
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
