import {
  BTN_SUBMIT,
  BTN_REFUND,
  BTN_CANCEL,
  BTN_CONVERT,
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
  TEXT,
} from "@/libs/constants/form.constant";
import {
  NUMERICAL_ORDER,
  TBL_BUTTON,
  TBL_STRING,
  TBL_NUMBER,
} from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";
import type {
  DepositCreateFormValues,
  DepositDetailFormValues,
} from "../shell/deposits.type";
import { formatDate } from "@/libs/utils";

export const getDepositColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  {
    name: "customerFullName",
    label: "COMMON_LABEL_CUSTOMER",
    type: TBL_STRING,
  },
  {
    name: "carChassisNumber",
    label: "CARS_FIELD_CHASSIS_NUMBER",
    type: TBL_STRING,
  },
  { name: "amount", label: "COMMON_LABEL_AMOUNT", type: TBL_NUMBER },
  {
    name: "depositDate",
    label: "DEPOSITS_FIELD_DATE",
    type: TBL_STRING,
    formatter: formatDate,
    styleCell: { textAlign: "center" },
  },
  {
    name: "expiryDate",
    label: "DEPOSITS_FIELD_EXPIRED_DATE",
    type: TBL_STRING,
    formatter: formatDate,
    styleCell: { textAlign: "center" },
  },
  { name: "statusDisplay", label: "COMMON_LABEL_STATUS", type: TBL_STRING },
  {
    name: "action",
    label: "COMMON_LABEL_ACTION",
    type: TBL_BUTTON,
    btnGroup: [
      { title: "COMMON_BTN_DETAIL", type: "button", action: BTN_DETAIL },
    ],
  },
];

export const getDepositsFormConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: SELECT,
      name: "customerId",
      label: "CONTRACTS_FIELD_CUSTOMER_ID",
      option: "customerOptions",
      required: true,
      size: 6,
    },
    {
      type: SELECT,
      name: "carId",
      label: "CONTRACTS_FIELD_CAR_ID",
      option: "carOptions",
      required: true,
      size: 6,
    },
    {
      type: SELECT,
      name: "employeeId",
      label: "CONTRACTS_FIELD_EMPLOYEE_ID",
      option: "employeeOptions",
      size: 6,
    },
    {
      type: SELECT,
      name: "quotationId",
      label: "DEPOSITS_FIELD_QUOTATION_ID",
      option: "quotationOptions",
      size: 6,
    },
    {
      type: NUMBER_INPUT,
      name: "amount",
      label: "DEPOSITS_FIELD_AMOUNT",
      required: true,
      size: 12,
    },
    { type: DATE, name: "depositDate", label: "DEPOSITS_FIELD_DATE", size: 6 },
    {
      type: DATE,
      name: "expiryDate",
      label: "DEPOSITS_FIELD_EXPIRED_DATE",
      size: 6,
    },
    {
      type: SELECT,
      name: "depositPaymentMethod",
      label: "DEPOSITS_FIELD_PAYMENT_METHOD",
      option: "depositPaymentMethodOptions",
      required: true,
      size: 12,
    },
    { type: TEXT, name: "notes", label: "CONTRACTS_FIELD_NOTES", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [
        {
          title: "DEPOSITS_BTN_CREATE_ORDER",
          type: "submit",
          action: BTN_SUBMIT,
        },
      ],
    },
  ],
});

export const getDepositsDetailFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "notes", label: "CONTRACTS_FIELD_NOTES", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [
        {
          title: "DEPOSITS_BTN_REFUND",
          type: "button",
          action: BTN_REFUND,
          style: { background: "#ed6c02", color: "#fff" },
        },
        {
          title: "DEPOSITS_BTN_CANCEL",
          type: "button",
          action: BTN_CANCEL,
          style: { background: "#d32f2f", color: "#fff" },
        },
        {
          title: "DEPOSITS_BTN_CONVERT",
          type: "button",
          action: BTN_CONVERT,
          style: { background: "#1976d2", color: "#fff" },
        },
      ],
    },
  ],
});

export const initDepositSearchForm = { status: "", page: 1, size: 10 };

export const depositsInitialValues: DepositCreateFormValues = {
  quotationId: null,
  customerId: null,
  carId: null,
  employeeId: null,
  amount: "",
  depositDate: "",
  expiryDate: "",
  depositPaymentMethod: null,
  notes: "",
};

export const depositDetailInitialValues: DepositDetailFormValues = {
  notes: "",
};

export const getDepositSearchConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: SELECT,
      name: "status",
      label: "COMMON_LABEL_STATUS",
      option: "depositStatusOptions",
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
