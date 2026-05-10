import {
  BTN_SUBMIT,
  BTN_UPDATE,
  BTN_DETAIL,
  BTN_DELETE,
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

export const getContractColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  {
    name: "contractNumber",
    label: "COMMON_LABEL_CONTRACT_CODE",
    type: TBL_STRING,
  },
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
  { name: "contractValue", label: "COMMON_LABEL_SALE_PRICE", type: TBL_NUMBER },
  { name: "status", label: "COMMON_LABEL_STATUS", type: TBL_STRING },
  {
    name: "action",
    label: "COMMON_LABEL_ACTION",
    type: TBL_BUTTON,
    btnGroup: [
      { title: "COMMON_BTN_DETAIL", type: "button", action: BTN_DETAIL },
      {
        title: "COMMON_BTN_DELETE",
        type: "button",
        action: BTN_DELETE,
        style: { background: "#d32f2f", color: "#fff" },
      },
    ],
  },
];

export const getContractsFormConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: NUMBER_INPUT,
      name: "customerId",
      label: "CONTRACTS_FIELD_CUSTOMER_ID",
      required: true,
      size: 6,
    },
    {
      type: NUMBER_INPUT,
      name: "carId",
      label: "CONTRACTS_FIELD_CAR_ID",
      required: true,
      size: 6,
    },
    {
      type: NUMBER_INPUT,
      name: "employeeId",
      label: "CONTRACTS_FIELD_EMPLOYEE_ID",
      size: 6,
    },
    {
      type: NUMBER_INPUT,
      name: "depositId",
      label: "CONTRACTS_FIELD_DEPOSIT_ID",
      size: 6,
    },
    {
      type: DATE,
      name: "signDate",
      label: "CONTRACTS_FIELD_SIGN_DATE",
      size: 6,
    },
    {
      type: DATE,
      name: "expectedDeliveryDate",
      label: "CONTRACTS_FIELD_DELIVERY_DATE",
      size: 6,
    },
    {
      type: NUMBER_INPUT,
      name: "contractValue",
      label: "CONTRACTS_FIELD_SALE_PRICE",
      required: true,
      size: 12,
    },
    { type: TEXT, name: "notes", label: "CONTRACTS_FIELD_NOTES", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [
        { title: "CONTRACTS_BTN_CREATE", type: "submit", action: BTN_SUBMIT },
      ],
    },
  ],
});

export const getContractsUpdateFormConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: DATE,
      name: "actualDeliveryDate",
      label: "CONTRACTS_FIELD_ACTUAL_DELIVERY_DATE",
      size: 6,
    },
    {
      type: SELECT,
      name: "status",
      label: "COMMON_LABEL_STATUS",
      option: "contractStatusOptions",
      size: 6,
    },
    { type: TEXT, name: "notes", label: "CONTRACTS_FIELD_NOTES", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [
        { title: "COMMON_BTN_SAVE", type: "button", action: BTN_UPDATE },
      ],
    },
  ],
});

export const initContractSearchForm = { status: "", page: 1, size: 10 };

export const contractsInitialValues = {
  customerId: "",
  carId: "",
  employeeId: "",
  depositId: "",
  signDate: "",
  expectedDeliveryDate: "",
  contractValue: "",
  notes: "",
};

export const getContractSearchConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: SELECT,
      name: "status",
      label: "COMMON_LABEL_STATUS",
      option: "contractStatusOptions",
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
