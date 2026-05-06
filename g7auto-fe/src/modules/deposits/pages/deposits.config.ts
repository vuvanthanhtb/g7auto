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
import { t } from "@/libs/i18n";

export const getDepositColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: t("LABEL_STT"), type: NUMERICAL_ORDER },
  { name: "code", label: t("LABEL_DEPOSIT_CODE"), type: TBL_STRING },
  { name: "customerName", label: t("LABEL_CUSTOMER"), type: TBL_STRING },
  { name: "carName", label: t("LABEL_CAR"), type: TBL_STRING },
  { name: "amount", label: t("LABEL_AMOUNT"), type: TBL_STRING },
  { name: "status", label: t("LABEL_STATUS"), type: TBL_STRING },
  {
    name: "action",
    label: t("LABEL_ACTION"),
    type: TBL_BUTTON,
    btnGroup: [{ title: t("BTN_DETAIL_ACTION"), type: "button", action: BTN_DETAIL }],
  },
];

export const getDepositsFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: NUMBER_INPUT, name: "customerId", label: t("FIELD_CUSTOMER_ID"), required: true, size: 6 },
    { type: NUMBER_INPUT, name: "carId", label: t("FIELD_CAR_ID"), required: true, size: 6 },
    { type: NUMBER_INPUT, name: "showroomId", label: t("FIELD_SHOWROOM_ID"), required: true, size: 6 },
    { type: NUMBER_INPUT, name: "employeeId", label: t("FIELD_EMPLOYEE_ID"), required: true, size: 6 },
    { type: NUMBER_INPUT, name: "amount", label: t("FIELD_DEPOSIT_AMOUNT_VND"), required: true, size: 12 },
    { type: DATE, name: "depositDate", label: t("FIELD_DEPOSIT_DATE"), size: 6 },
    { type: DATE, name: "expiredDate", label: t("FIELD_EXPIRED_DATE"), size: 6 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: t("BTN_CREATE_DEPOSIT_ORDER"), type: "submit", action: BTN_SUBMIT }],
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
    { type: SELECT, name: "status", label: t("LABEL_STATUS"), option: "depositStatusOptions", size: 3 },
    {
      type: BUTTON,
      size: 9,
      childs: [
        { title: t("BTN_REFRESH_ACTION"), type: "button", action: BTN_REFRESH, style: { background: "#757575", color: "#fff" } },
        { title: t("BTN_SEARCH_ACTION"), type: "button", action: BTN_SEARCH, style: { background: "#1976d2", color: "#fff" } },
        { title: t("BTN_EXPORT_EXCEL"), type: "button", action: BTN_EXPORT, style: { background: "#2e7d32", color: "#fff" } },
      ],
    },
  ],
});
