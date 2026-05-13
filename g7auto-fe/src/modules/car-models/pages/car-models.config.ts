import {
  BTN_SUBMIT,
  BTN_EDIT,
  BTN_DELETE,
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
} from "@/libs/constants/button.constant";
import { BUTTON, TEXT, NUMBER_INPUT, SELECT } from "@/libs/constants/form.constant";
import type { CarModelFormValues } from "../shell/car-model.type";
import {
  NUMERICAL_ORDER,
  TBL_BUTTON,
  TBL_NUMBER,
  TBL_STRING,
} from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";

export const getCarModelColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "name", label: "COMMON_LABEL_CAR_MODEL_NAME", type: TBL_STRING },
  {
    name: "manufacturer",
    label: "COMMON_LABEL_MANUFACTURER",
    type: TBL_STRING,
  },
  {
    name: "year",
    label: "COMMON_LABEL_YEAR",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
  { name: "listedPrice", label: "COMMON_LABEL_LISTED_PRICE", type: TBL_NUMBER },
  {
    name: "action",
    label: "COMMON_LABEL_ACTION",
    type: TBL_BUTTON,
    styleCell: { justifyContent: "center" },
    btnGroup: [
      { title: "COMMON_BTN_EDIT", type: "button", action: BTN_EDIT },
      {
        title: "COMMON_BTN_DELETE",
        type: "button",
        action: BTN_DELETE,
        style: { background: "#d32f2f", color: "#fff" },
      },
    ],
  },
];

export const getCarModelFormConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: TEXT,
      name: "name",
      label: "CAR_MODELS_FIELD_NAME",
      required: true,
      size: 12,
    },
    {
      type: TEXT,
      name: "manufacturer",
      label: "CAR_MODELS_FIELD_MANUFACTURER",
      required: true,
      size: 6,
    },
    {
      type: NUMBER_INPUT,
      name: "year",
      label: "CAR_MODELS_FIELD_YEAR",
      size: 6,
    },
    {
      type: NUMBER_INPUT,
      name: "listedPrice",
      label: "CAR_MODELS_FIELD_LISTED_PRICE",
      size: 12,
    },
    {
      type: TEXT,
      name: "description",
      label: "CAR_MODELS_FIELD_DESCRIPTION",
      size: 12,
    },
    {
      type: BUTTON,
      size: 12,
      childs: [
        { title: "COMMON_BTN_SAVE", type: "submit", action: BTN_SUBMIT },
      ],
    },
  ],
});

export const yearOptions = Array.from(
  { length: new Date().getFullYear() - 1944 },
  (_, i) => {
    const y = String(new Date().getFullYear() - i);
    return { label: y, value: y };
  },
);

export const initCarModelSearchForm = { name: "", manufacturer: "", year: "", page: 1, size: 10 };

export const carModelInitialValues: CarModelFormValues = {
  name: "",
  manufacturer: "",
  year: "",
  listedPrice: "",
  description: "",
};

export const getCarModelSearchConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "name", label: "CAR_MODELS_FIELD_NAME", size: 3 },
    {
      type: TEXT,
      name: "manufacturer",
      label: "CAR_MODELS_FIELD_MANUFACTURER_SEARCH",
      size: 3,
    },
    {
      type: SELECT,
      name: "year",
      label: "CAR_MODELS_FIELD_YEAR",
      option: "yearOptions",
      size: 3,
    },
    {
      type: BUTTON,
      size: 3,
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
