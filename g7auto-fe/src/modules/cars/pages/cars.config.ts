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

export const carColumns: BaseTableColumn[] = [
  { name: "NUMERICAL_ORDER", label: "STT", type: NUMERICAL_ORDER },
  { name: "licensePlate", label: "Biển số", type: TBL_STRING },
  { name: "carModelName", label: "Dòng xe", type: TBL_STRING },
  { name: "color", label: "Màu sắc", type: TBL_STRING },
  { name: "showroomName", label: "Showroom", type: TBL_STRING },
  { name: "status", label: "Trạng thái", type: TBL_STRING },
  {
    name: "action",
    label: "Thao tác",
    type: TBL_BUTTON,
    btnGroup: [{ title: "Sửa", type: "button", action: BTN_EDIT }],
  },
];

export const carFormConfig: IBaseFormConfig = {
  fields: [
    {
      type: TEXT,
      name: "licensePlate",
      label: "Biển số xe",
      required: true,
      size: 6,
    },
    { type: TEXT, name: "color", label: "Màu sắc", size: 6 },
    {
      type: NUMBER_INPUT,
      name: "carModelId",
      label: "Mã dòng xe",
      required: true,
      size: 6,
    },
    {
      type: NUMBER_INPUT,
      name: "showroomId",
      label: "Mã showroom",
      required: true,
      size: 6,
    },
    { type: NUMBER_INPUT, name: "salePrice", label: "Giá bán (VND)", size: 12 },
    {
      type: SELECT,
      name: "status",
      label: "Trạng thái",
      option: "carStatusOptions",
      size: 12,
    },
    { type: TEXT, name: "vin", label: "Số VIN", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "Lưu", type: "submit", action: BTN_SUBMIT }],
    },
  ],
};

export const carInitialValues = {
  licensePlate: "",
  color: "",
  carModelId: "",
  showroomId: "",
  salePrice: "",
  status: "",
  vin: "",
};

export const carSearchConfig: IBaseFormConfig = {
  fields: [
    {
      type: SELECT,
      name: "status",
      label: "Trạng thái",
      option: "carStatusOptions",
      size: 3,
    },
    {
      type: BUTTON,
      size: 9,
      childs: [
        {
          title: "Làm mới",
          type: "button",
          action: BTN_REFRESH,
          style: { background: "#757575", color: "#fff" },
        },
        {
          title: "Tìm kiếm",
          type: "button",
          action: BTN_SEARCH,
          style: { background: "#1976d2", color: "#fff" },
        },
        {
          title: "Xuất Excel",
          type: "button",
          action: BTN_EXPORT,
          style: { background: "#2e7d32", color: "#fff" },
        },
      ],
    },
  ],
};
