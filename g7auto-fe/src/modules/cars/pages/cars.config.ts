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

export const getCarColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "licensePlate", label: "COMMON_LABEL_LICENSE_PLATE", type: TBL_STRING },
  { name: "carModelName", label: "COMMON_LABEL_CAR_MODEL", type: TBL_STRING },
  { name: "color", label: "COMMON_LABEL_COLOR", type: TBL_STRING },
  { name: "showroomName", label: "COMMON_LABEL_SHOWROOM", type: TBL_STRING },
  { name: "status", label: "COMMON_LABEL_STATUS", type: TBL_STRING },
  {
    name: "action",
    label: "COMMON_LABEL_ACTION",
    type: TBL_BUTTON,
    btnGroup: [{ title: "COMMON_BTN_EDIT", type: "button", action: BTN_EDIT }],
  },
];

export const getCarFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "licensePlate", label: "CARS_FIELD_LICENSE_PLATE", required: true, size: 6 },
    { type: TEXT, name: "color", label: "COMMON_LABEL_COLOR", size: 6 },
    { type: NUMBER_INPUT, name: "carModelId", label: "CARS_FIELD_MODEL_ID", required: true, size: 6 },
    { type: NUMBER_INPUT, name: "showroomId", label: "CARS_FIELD_SHOWROOM_ID", required: true, size: 6 },
    { type: NUMBER_INPUT, name: "salePrice", label: "CARS_FIELD_SALE_PRICE", size: 12 },
    { type: SELECT, name: "status", label: "COMMON_LABEL_STATUS", option: "carStatusOptions", size: 12 },
    { type: TEXT, name: "vin", label: "CARS_FIELD_VIN", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "COMMON_BTN_SAVE", type: "submit", action: BTN_SUBMIT }],
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
    { type: SELECT, name: "status", label: "COMMON_LABEL_STATUS", option: "carStatusOptions", size: 3 },
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
