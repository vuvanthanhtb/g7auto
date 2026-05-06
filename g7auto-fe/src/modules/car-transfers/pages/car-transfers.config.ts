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

export const getCarTransferColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "carName", label: "COMMON_LABEL_CAR", type: TBL_STRING },
  { name: "fromShowroomName", label: "COMMON_LABEL_FROM_SHOWROOM", type: TBL_STRING },
  { name: "toShowroomName", label: "COMMON_LABEL_TO_SHOWROOM", type: TBL_STRING },
  { name: "status", label: "COMMON_LABEL_STATUS", type: TBL_STRING },
  { name: "transferDate", label: "COMMON_LABEL_TRANSFER_DATE", type: TBL_STRING },
  {
    name: "action",
    label: "COMMON_LABEL_ACTION",
    type: TBL_BUTTON,
    btnGroup: [{ title: "COMMON_BTN_DETAIL", type: "button", action: BTN_DETAIL }],
  },
];

export const getCarTransfersFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: NUMBER_INPUT, name: "carId", label: "COMMON_LABEL_CAR", required: true, size: 12 },
    { type: NUMBER_INPUT, name: "fromShowroomId", label: "TRANSFERS_FIELD_FROM_SHOWROOM", required: true, size: 6 },
    { type: NUMBER_INPUT, name: "toShowroomId", label: "TRANSFERS_FIELD_TO_SHOWROOM", required: true, size: 6 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "TRANSFERS_BTN_CREATE", type: "submit", action: BTN_SUBMIT }],
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
    { type: SELECT, name: "status", label: "COMMON_LABEL_STATUS", option: "transferStatusOptions", size: 3 },
    {
      type: BUTTON,
      size: 9,
      childs: [
        { title: "COMMON_BTN_REFRESH", type: "button", action: BTN_REFRESH, style: { background: "#757575", color: "#fff" } },
        { title: "COMMON_BTN_SEARCH", type: "button", action: BTN_SEARCH, style: { background: "#1976d2", color: "#fff" } },
        { title: "COMMON_BTN_EXPORT", type: "button", action: BTN_EXPORT, style: { background: "#2e7d32", color: "#fff" } },
      ],
    },
  ],
});
