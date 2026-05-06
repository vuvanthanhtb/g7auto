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

export const getContractColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: t("LABEL_STT"), type: NUMERICAL_ORDER },
  { name: "code", label: t("LABEL_CONTRACT_CODE"), type: TBL_STRING },
  { name: "customerName", label: t("LABEL_CUSTOMER"), type: TBL_STRING },
  { name: "carName", label: t("LABEL_CAR"), type: TBL_STRING },
  { name: "salePrice", label: t("LABEL_SALE_PRICE"), type: TBL_STRING },
  { name: "status", label: t("LABEL_STATUS"), type: TBL_STRING },
  {
    name: "action",
    label: t("LABEL_ACTION"),
    type: TBL_BUTTON,
    btnGroup: [{ title: t("BTN_DETAIL_ACTION"), type: "button", action: BTN_DETAIL }],
  },
];

export const getContractsFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: NUMBER_INPUT, name: "customerId", label: t("FIELD_CUSTOMER_ID"), required: true, size: 6 },
    { type: NUMBER_INPUT, name: "carId", label: t("FIELD_CAR_ID"), required: true, size: 6 },
    { type: NUMBER_INPUT, name: "showroomId", label: t("FIELD_SHOWROOM_ID"), required: true, size: 6 },
    { type: NUMBER_INPUT, name: "employeeId", label: t("FIELD_EMPLOYEE_ID"), required: true, size: 6 },
    { type: NUMBER_INPUT, name: "salePrice", label: t("FIELD_SALE_PRICE_VND"), required: true, size: 6 },
    { type: NUMBER_INPUT, name: "depositAmount", label: t("FIELD_DEPOSIT_AMOUNT"), size: 6 },
    { type: DATE, name: "signDate", label: t("FIELD_SIGN_DATE"), size: 6 },
    { type: DATE, name: "deliveryDate", label: t("FIELD_DELIVERY_DATE"), size: 6 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: t("BTN_CREATE_CONTRACT"), type: "submit", action: BTN_SUBMIT }],
    },
  ],
});

export const contractsInitialValues = {
  customerId: "",
  carId: "",
  showroomId: "",
  employeeId: "",
  salePrice: "",
  depositAmount: "",
  signDate: "",
  deliveryDate: "",
};

export const getContractSearchConfig = (): IBaseFormConfig => ({
  fields: [
    { type: SELECT, name: "status", label: t("LABEL_STATUS"), option: "contractStatusOptions", size: 3 },
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
