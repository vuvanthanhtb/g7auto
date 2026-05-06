import {
  BTN_SUBMIT,
  BTN_EDIT,
  BTN_REFRESH,
  BTN_EXPORT,
} from "@/libs/constants/button.constant";
import {
  BUTTON,
  NUMBER_INPUT,
  TEXT,
  DATE,
} from "@/libs/constants/form.constant";
import {
  NUMERICAL_ORDER,
  TBL_BUTTON,
  TBL_STRING,
} from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";
import { t } from "@/libs/i18n";

export const getServiceHistoryColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: t("LABEL_STT"), type: NUMERICAL_ORDER },
  { name: "carName", label: t("LABEL_CAR"), type: TBL_STRING },
  { name: "serviceType", label: t("LABEL_SERVICE_TYPE"), type: TBL_STRING },
  { name: "showroomName", label: t("LABEL_SHOWROOM"), type: TBL_STRING },
  { name: "cost", label: t("LABEL_COST"), type: TBL_STRING },
  { name: "serviceDate", label: t("LABEL_SERVICE_DATE"), type: TBL_STRING },
  {
    name: "action",
    label: t("LABEL_ACTION"),
    type: TBL_BUTTON,
    btnGroup: [{ title: t("BTN_EDIT_ACTION"), type: "button", action: BTN_EDIT }],
  },
];

export const getServiceHistoryFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: NUMBER_INPUT, name: "carId", label: t("FIELD_CAR_ID"), required: true, size: 6 },
    { type: NUMBER_INPUT, name: "showroomId", label: t("FIELD_SHOWROOM_ID"), required: true, size: 6 },
    { type: NUMBER_INPUT, name: "employeeId", label: t("FIELD_EMPLOYEE_ID"), size: 6 },
    { type: TEXT, name: "serviceType", label: t("FIELD_SERVICE_TYPE"), required: true, size: 6 },
    { type: TEXT, name: "description", label: t("FIELD_DESCRIPTION"), size: 12 },
    { type: NUMBER_INPUT, name: "cost", label: t("FIELD_COST_VND"), size: 6 },
    { type: DATE, name: "serviceDate", label: t("FIELD_SERVICE_DATE"), size: 6 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: t("BTN_SAVE"), type: "submit", action: BTN_SUBMIT }],
    },
  ],
});

export const serviceHistoryInitialValues = {
  carId: "",
  showroomId: "",
  employeeId: "",
  serviceType: "",
  description: "",
  cost: "",
  serviceDate: "",
};

export const getServiceHistorySearchConfig = (): IBaseFormConfig => ({
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
