import {
  BTN_SUBMIT,
  BTN_EDIT,
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
} from "@/libs/constants/button.constant";
import {
  BUTTON,
  TEXT,
  NUMBER_INPUT,
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

export const getCarColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: t("LABEL_STT"), type: NUMERICAL_ORDER },
  { name: "licensePlate", label: t("LABEL_LICENSE_PLATE"), type: TBL_STRING },
  { name: "carModelName", label: t("LABEL_CAR_MODEL"), type: TBL_STRING },
  { name: "color", label: t("LABEL_COLOR"), type: TBL_STRING },
  { name: "showroomName", label: t("LABEL_SHOWROOM"), type: TBL_STRING },
  { name: "status", label: t("LABEL_STATUS"), type: TBL_STRING },
  {
    name: "action",
    label: t("LABEL_ACTION"),
    type: TBL_BUTTON,
    btnGroup: [{ title: t("BTN_EDIT_ACTION"), type: "button", action: BTN_EDIT }],
  },
];

export const getCarFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "licensePlate", label: t("FIELD_LICENSE_PLATE"), required: true, size: 6 },
    { type: TEXT, name: "color", label: t("LABEL_COLOR"), size: 6 },
    { type: NUMBER_INPUT, name: "carModelId", label: t("FIELD_CAR_MODEL_ID"), required: true, size: 6 },
    { type: NUMBER_INPUT, name: "showroomId", label: t("FIELD_SHOWROOM_ID"), required: true, size: 6 },
    { type: NUMBER_INPUT, name: "salePrice", label: t("FIELD_SALE_PRICE"), size: 12 },
    { type: SELECT, name: "status", label: t("LABEL_STATUS"), option: "carStatusOptions", size: 12 },
    { type: TEXT, name: "vin", label: t("FIELD_VIN"), size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: t("BTN_SAVE"), type: "submit", action: BTN_SUBMIT }],
    },
  ],
});

export const carInitialValues = {
  licensePlate: "",
  color: "",
  carModelId: "",
  showroomId: "",
  salePrice: "",
  status: "",
  vin: "",
};

export const getCarSearchConfig = (): IBaseFormConfig => ({
  fields: [
    { type: SELECT, name: "status", label: t("LABEL_STATUS"), option: "carStatusOptions", size: 3 },
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
