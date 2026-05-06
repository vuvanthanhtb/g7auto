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
import { t } from "@/libs/i18n";

export const getPaymentColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: t("LABEL_STT"), type: NUMERICAL_ORDER },
  { name: "code", label: t("LABEL_PAYMENT_CODE"), type: TBL_STRING },
  { name: "contractCode", label: t("LABEL_CONTRACT_REF"), type: TBL_STRING },
  { name: "customerName", label: t("LABEL_CUSTOMER"), type: TBL_STRING },
  { name: "amount", label: t("LABEL_AMOUNT"), type: TBL_STRING },
  { name: "status", label: t("LABEL_STATUS"), type: TBL_STRING },
  {
    name: "action",
    label: t("LABEL_ACTION"),
    type: TBL_BUTTON,
    btnGroup: [{ title: t("BTN_DETAIL_ACTION"), type: "button", action: BTN_DETAIL }],
  },
];

export const getPaymentsFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: NUMBER_INPUT, name: "contractId", label: t("FIELD_CONTRACT_ID"), required: true, size: 12 },
    { type: NUMBER_INPUT, name: "amount", label: t("FIELD_AMOUNT_VND"), required: true, size: 6 },
    { type: TEXT, name: "paymentMethod", label: t("FIELD_PAYMENT_METHOD"), size: 6 },
    { type: DATETIME, name: "paymentTime", label: t("FIELD_PAYMENT_TIME"), size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: t("BTN_CREATE_PAYMENT"), type: "submit", action: BTN_SUBMIT }],
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
        { title: t("BTN_REFRESH_ACTION"), type: "button", action: BTN_REFRESH, style: { background: "#757575", color: "#fff" } },
        { title: t("BTN_EXPORT_EXCEL"), type: "button", action: BTN_EXPORT, style: { background: "#2e7d32", color: "#fff" } },
      ],
    },
  ],
});
