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
  TEXTAREA,
} from "@/libs/constants/form.constant";
import { defaultSelectOption } from "@/libs/constants/options.constant";
import {
  NUMERICAL_ORDER,
  TBL_BUTTON,
  TBL_STRING,
} from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";

export const getCarColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  {
    name: "chassisNumber",
    label: "CARS_FIELD_CHASSIS_NUMBER",
    type: TBL_STRING,
  },
  {
    name: "licensePlate",
    label: "COMMON_LABEL_LICENSE_PLATE",
    type: TBL_STRING,
  },
  { name: "carModelName", label: "COMMON_LABEL_CAR_MODEL", type: TBL_STRING },
  { name: "showroomName", label: "COMMON_LABEL_SHOWROOM", type: TBL_STRING },
  { name: "status", label: "COMMON_LABEL_STATUS", type: TBL_STRING },
  {
    name: "action",
    label: "COMMON_LABEL_ACTION",
    type: TBL_BUTTON,
    btnGroup: [{ title: "COMMON_BTN_EDIT", type: "button", action: BTN_EDIT }],
  },
];

export const getCarCreateFormConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: TEXT,
      name: "chassisNumber",
      label: "CARS_FIELD_CHASSIS_NUMBER",
      required: true,
      size: 6,
    },
    {
      type: TEXT,
      name: "engineNumber",
      label: "CARS_FIELD_ENGINE_NUMBER",
      required: true,
      size: 6,
    },
    {
      type: TEXT,
      name: "licensePlate",
      label: "CARS_FIELD_LICENSE_PLATE",
      size: 6,
    },
    {
      type: NUMBER_INPUT,
      name: "salePrice",
      label: "CARS_FIELD_SALE_PRICE",
      size: 6,
    },
    {
      type: SELECT,
      name: "carModelId",
      label: "COMMON_LABEL_CAR_MODEL",
      option: "carModelOptions",
      required: true,
      size: 6,
    },
    {
      type: SELECT,
      name: "showroomId",
      label: "COMMON_LABEL_SHOWROOM",
      option: "showroomOptions",
      required: true,
      size: 6,
    },
    { type: TEXTAREA, name: "notes", label: "CARS_FIELD_NOTES", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [
        { title: "COMMON_BTN_SAVE", type: "submit", action: BTN_SUBMIT },
      ],
    },
  ],
});

export const getCarEditFormConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: TEXT,
      name: "licensePlate",
      label: "CARS_FIELD_LICENSE_PLATE",
      size: 6,
    },
    {
      type: NUMBER_INPUT,
      name: "salePrice",
      label: "CARS_FIELD_SALE_PRICE",
      size: 6,
    },
    {
      type: SELECT,
      name: "showroomId",
      label: "COMMON_LABEL_SHOWROOM",
      option: "showroomOptions",
      size: 6,
    },
    {
      type: SELECT,
      name: "status",
      label: "COMMON_LABEL_STATUS",
      option: "carStatusOptions",
      size: 6,
    },
    { type: TEXTAREA, name: "notes", label: "CARS_FIELD_NOTES", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [
        { title: "COMMON_BTN_SAVE", type: "submit", action: BTN_SUBMIT },
      ],
    },
  ],
});

export const initCarSearchForm = {
  status: defaultSelectOption,
  showroom: null,
  carModel: null,
  licensePlate: "",
  page: 1,
  size: 10,
};

export const carCreateInitialValues = {
  chassisNumber: "",
  engineNumber: "",
  licensePlate: "",
  carModelId: null,
  showroomId: null,
  salePrice: "",
  notes: "",
};

export const carEditInitialValues = {
  licensePlate: "",
  showroomId: null,
  salePrice: "",
  status: null,
  notes: "",
};

export const getCarSearchConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: SELECT,
      name: "showroom",
      label: "COMMON_LABEL_SHOWROOM",
      option: "showroomOptions",
      size: 3,
    },
    {
      type: SELECT,
      name: "carModel",
      label: "COMMON_LABEL_CAR_MODEL",
      option: "carModelOptions",
      size: 3,
    },
    {
      type: TEXT,
      name: "licensePlate",
      label: "COMMON_LABEL_LICENSE_PLATE",
      size: 3,
    },
    {
      type: SELECT,
      name: "status",
      label: "COMMON_LABEL_STATUS",
      option: "carStatusOptions",
      size: 3,
    },
    {
      type: BUTTON,
      size: 12,
      childs: [
        {
          title: "COMMON_BTN_REFRESH",
          type: "button",
          action: BTN_REFRESH,
          style: { background: "#757575", color: "#fff" },
        },
        {
          title: "COMMON_BTN_SEARCH",
          type: "button",
          action: BTN_SEARCH,
          style: { background: "#1976d2", color: "#fff" },
        },
        {
          title: "COMMON_BTN_EXPORT",
          type: "button",
          action: BTN_EXPORT,
          style: { background: "#2e7d32", color: "#fff" },
        },
      ],
    },
  ],
});
