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

export const getQuotationColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "code", label: "COMMON_LABEL_QUOTATION_CODE", type: TBL_STRING },
  { name: "customerName", label: "COMMON_LABEL_CUSTOMER", type: TBL_STRING },
  { name: "carName", label: "COMMON_LABEL_CAR", type: TBL_STRING },
  { name: "quotedPrice", label: "COMMON_LABEL_QUOTED_PRICE", type: TBL_STRING },
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
      name: "showroomId",
      label: "CARS_FIELD_SHOWROOM_ID",
      required: true,
      size: 6,
    },
    {
      type: NUMBER_INPUT,
      name: "employeeId",
      label: "CONTRACTS_FIELD_EMPLOYEE_ID",
      required: true,
      size: 6,
    },
    {
      type: NUMBER_INPUT,
      name: "quotedPrice",
      label: "QUOTATIONS_FIELD_QUOTED_PRICE",
      required: true,
      size: 12,
    },
    {
      type: DATE,
      name: "validDate",
      label: "QUOTATIONS_FIELD_VALID_DATE",
      size: 12,
    },
    {
      type: BUTTON,
      size: 12,
      childs: [
        { title: "QUOTATIONS_BTN_CREATE", type: "submit", action: BTN_SUBMIT },
      ],
    },
  ],
});

export const quotationsInitialValues = {
  customerId: "",
  carId: "",
  showroomId: "",
  employeeId: "",
  quotedPrice: "",
  validDate: "",
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
