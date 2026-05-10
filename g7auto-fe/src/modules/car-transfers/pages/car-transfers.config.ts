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
  SELECT,
  TEXT,
  DATE,
  TEXTAREA,
} from "@/libs/constants/form.constant";
import {
  NUMERICAL_ORDER,
  TBL_BUTTON,
  TBL_STRING,
} from "@/libs/constants/table.constant";
import {
  defaultSelectOption,
  transferStatusOptions as baseTransferStatusOptions,
} from "@/libs/constants/options.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";
import type { CarTransferSearchForm } from "./car-transfers.type";

export const getCarTransferColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "carChassisNumber", label: "COMMON_LABEL_CAR", type: TBL_STRING },
  {
    name: "fromShowroomName",
    label: "COMMON_LABEL_FROM_SHOWROOM",
    type: TBL_STRING,
  },
  {
    name: "toShowroomName",
    label: "COMMON_LABEL_TO_SHOWROOM",
    type: TBL_STRING,
  },
  { name: "reason", label: "TRANSFERS_FIELD_REASON", type: TBL_STRING },
  { name: "status", label: "COMMON_LABEL_STATUS", type: TBL_STRING },
  {
    name: "transferDate",
    label: "COMMON_LABEL_TRANSFER_DATE",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
  {
    name: "createdAt",
    label: "COMMON_LABEL_CREATED_AT",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
  {
    name: "action",
    label: "COMMON_LABEL_ACTION",
    type: TBL_BUTTON,
    btnGroup: [
      { title: "COMMON_BTN_DETAIL", type: "button", action: BTN_DETAIL },
    ],
  },
];

export const transferStatusOptions = [
  defaultSelectOption,
  ...baseTransferStatusOptions,
];

export const searchInitialValues: CarTransferSearchForm = {
  status: defaultSelectOption,
  page: 1,
  size: 10,
};

export const getCarTransferSearchConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: SELECT,
      name: "status",
      label: "COMMON_LABEL_STATUS",
      option: "transferStatusOptions",
      size: 3,
    },
    {
      type: BUTTON,
      size: 9,
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

export const getCarTransfersFormConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: NUMBER_INPUT,
      name: "carId",
      label: "COMMON_LABEL_CAR",
      required: true,
      size: 12,
    },
    {
      type: NUMBER_INPUT,
      name: "fromShowroomId",
      label: "TRANSFERS_FIELD_FROM_SHOWROOM",
      required: true,
      size: 6,
    },
    {
      type: NUMBER_INPUT,
      name: "toShowroomId",
      label: "TRANSFERS_FIELD_TO_SHOWROOM",
      required: true,
      size: 6,
    },
    {
      type: TEXT,
      name: "reason",
      label: "TRANSFERS_FIELD_REASON",
      required: true,
      size: 12,
    },
    {
      type: DATE,
      name: "expectedReceiveDate",
      label: "TRANSFERS_FIELD_EXPECTED_DATE",
      size: 12,
    },
    { type: TEXTAREA, name: "notes", label: "TRANSFERS_FIELD_NOTES", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [
        { title: "TRANSFERS_BTN_CREATE", type: "submit", action: BTN_SUBMIT },
      ],
    },
  ],
});

export const createInitialValues = {
  carId: "",
  fromShowroomId: "",
  toShowroomId: "",
  reason: "",
  expectedReceiveDate: "",
  notes: "",
};
