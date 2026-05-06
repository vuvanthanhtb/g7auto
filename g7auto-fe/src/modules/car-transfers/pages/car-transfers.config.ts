import {
  BTN_SUBMIT,
  BTN_DETAIL,
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
} from "@/libs/constants/button.constant";
import { BUTTON, NUMBER_INPUT, SELECT } from "@/libs/constants/form.constant";
import {
  NUMERICAL_ORDER,
  TBL_BUTTON,
  TBL_STRING,
} from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";
import { t } from "@/libs/i18n";

export const getCarTransferColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: t("LABEL_STT"), type: NUMERICAL_ORDER },
  { name: "carName", label: t("LABEL_CAR"), type: TBL_STRING },
  { name: "fromShowroomName", label: t("LABEL_FROM_SHOWROOM"), type: TBL_STRING },
  { name: "toShowroomName", label: t("LABEL_TO_SHOWROOM"), type: TBL_STRING },
  { name: "status", label: t("LABEL_STATUS"), type: TBL_STRING },
  { name: "transferDate", label: t("LABEL_TRANSFER_DATE"), type: TBL_STRING },
  {
    name: "action",
    label: t("LABEL_ACTION"),
    type: TBL_BUTTON,
    btnGroup: [{ title: t("BTN_DETAIL_ACTION"), type: "button", action: BTN_DETAIL }],
  },
];

export const getCarTransfersFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: NUMBER_INPUT, name: "carId", label: t("FIELD_CAR_ID"), required: true, size: 12 },
    { type: NUMBER_INPUT, name: "fromShowroomId", label: t("FIELD_FROM_SHOWROOM_ID"), required: true, size: 6 },
    { type: NUMBER_INPUT, name: "toShowroomId", label: t("FIELD_TO_SHOWROOM_ID"), required: true, size: 6 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: t("BTN_CREATE_TRANSFER"), type: "submit", action: BTN_SUBMIT }],
    },
  ],
});

export const carTransfersInitialValues = {
  carId: "",
  fromShowroomId: "",
  toShowroomId: "",
};

export const getCarTransferSearchConfig = (): IBaseFormConfig => ({
  fields: [
    { type: SELECT, name: "status", label: t("LABEL_STATUS"), option: "transferStatusOptions", size: 3 },
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
