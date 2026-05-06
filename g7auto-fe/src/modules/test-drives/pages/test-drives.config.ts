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
  DATETIME,
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

export const getTestDriveColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: t("LABEL_STT"), type: NUMERICAL_ORDER },
  { name: "customerName", label: t("LABEL_CUSTOMER"), type: TBL_STRING },
  { name: "carName", label: t("LABEL_CAR"), type: TBL_STRING },
  { name: "showroomName", label: t("LABEL_SHOWROOM"), type: TBL_STRING },
  { name: "startTime", label: t("LABEL_START_TIME"), type: TBL_STRING },
  { name: "status", label: t("LABEL_STATUS"), type: TBL_STRING },
  {
    name: "action",
    label: t("LABEL_ACTION"),
    type: TBL_BUTTON,
    btnGroup: [{ title: t("BTN_DETAIL_ACTION"), type: "button", action: BTN_DETAIL }],
  },
];

export const getTestDrivesFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: NUMBER_INPUT, name: "customerId", label: t("FIELD_CUSTOMER_ID"), required: true, size: 6 },
    { type: NUMBER_INPUT, name: "carId", label: t("FIELD_CAR_ID"), required: true, size: 6 },
    { type: NUMBER_INPUT, name: "showroomId", label: t("FIELD_SHOWROOM_ID"), required: true, size: 6 },
    { type: NUMBER_INPUT, name: "employeeId", label: t("FIELD_EMPLOYEE_ID"), size: 6 },
    { type: DATETIME, name: "startTime", label: t("FIELD_START_TIME"), required: true, size: 6 },
    { type: DATETIME, name: "endTime", label: t("FIELD_END_TIME"), size: 6 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: t("BTN_REGISTER_TEST_DRIVE"), type: "submit", action: BTN_SUBMIT }],
    },
  ],
});

export const testDrivesInitialValues = {
  customerId: "",
  carId: "",
  showroomId: "",
  employeeId: "",
  startTime: "",
  endTime: "",
};

export const getTestDriveSearchConfig = (): IBaseFormConfig => ({
  fields: [
    { type: SELECT, name: "status", label: t("LABEL_STATUS"), option: "testDriveStatusOptions", size: 3 },
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
