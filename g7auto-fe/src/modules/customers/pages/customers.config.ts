import {
  BTN_SUBMIT,
  BTN_EDIT,
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
} from "@/libs/constants/button.constant";
import { BUTTON, TEXT } from "@/libs/constants/form.constant";
import {
  TBL_STRING,
  TBL_BUTTON,
  NUMERICAL_ORDER,
} from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";
import { t } from "@/libs/i18n";

export const getCustomerColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: t("LABEL_STT"), type: NUMERICAL_ORDER },
  { name: "fullName", label: t("LABEL_FULL_NAME"), type: TBL_STRING },
  { name: "phone", label: t("LABEL_PHONE"), type: TBL_STRING },
  { name: "email", label: t("LABEL_EMAIL"), type: TBL_STRING },
  { name: "idCard", label: t("LABEL_NATIONAL_ID"), type: TBL_STRING },
  {
    name: "action",
    label: t("LABEL_ACTION"),
    type: TBL_BUTTON,
    btnGroup: [{ title: t("BTN_EDIT_ACTION"), type: "button", action: BTN_EDIT }],
  },
];

export const getCustomerFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "fullName", label: t("FIELD_FULL_NAME"), required: true, size: 12 },
    { type: TEXT, name: "phone", label: t("FIELD_PHONE"), required: true, size: 6 },
    { type: TEXT, name: "email", label: t("LABEL_EMAIL"), size: 6 },
    { type: TEXT, name: "idCard", label: t("FIELD_NATIONAL_ID"), size: 6 },
    { type: TEXT, name: "address", label: t("FIELD_ADDRESS"), size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: t("BTN_SAVE"), type: "submit", action: BTN_SUBMIT }],
    },
  ],
});

export const customerInitialValues = {
  fullName: "",
  phone: "",
  email: "",
  idCard: "",
  address: "",
};

export const getCustomerSearchConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "fullName", label: t("FIELD_FULL_NAME_SEARCH"), size: 3 },
    { type: TEXT, name: "phone", label: t("FIELD_PHONE"), size: 3 },
    {
      type: BUTTON,
      size: 6,
      style: { justifyContent: "flex-start" },
      childs: [
        { title: t("BTN_REFRESH_ACTION"), type: "button", action: BTN_REFRESH, style: { background: "#757575", color: "#fff" } },
        { title: t("BTN_SEARCH_ACTION"), type: "button", action: BTN_SEARCH, style: { background: "#1976d2", color: "#fff" } },
        { title: t("BTN_EXPORT_EXCEL"), type: "button", action: BTN_EXPORT, style: { background: "#2e7d32", color: "#fff" } },
      ],
    },
  ],
});
