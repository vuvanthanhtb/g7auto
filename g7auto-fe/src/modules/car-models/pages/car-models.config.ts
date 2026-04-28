import {
  BTN_SUBMIT,
  BTN_EDIT,
  BTN_DELETE,
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
import { BUTTON as TBTN, STRING } from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";

export const carModelColumns: BaseTableColumn[] = [
  { name: "name", label: "Tên dòng xe", type: STRING },
  { name: "manufacturer", label: "Hãng", type: STRING },
  { name: "year", label: "Năm SX", type: STRING },
  { name: "listedPrice", label: "Giá niêm yết", type: STRING },
  {
    name: "action",
    label: "Thao tác",
    type: TBTN,
    btnGroup: [
      { title: "Sửa", type: "button", action: BTN_EDIT },
      { title: "Xóa", type: "button", action: BTN_DELETE },
    ],
  },
];

export const carModelFormConfig: IBaseFormConfig = {
  fields: [
    {
      type: TEXT,
      name: "name",
      label: "Tên dòng xe",
      required: true,
      size: 12,
    },
    {
      type: TEXT,
      name: "manufacturer",
      label: "Hãng sản xuất",
      required: true,
      size: 6,
    },
    { type: NUMBER_INPUT, name: "year", label: "Năm sản xuất", size: 6 },
    {
      type: NUMBER_INPUT,
      name: "listedPrice",
      label: "Giá niêm yết (VND)",
      size: 12,
    },
    { type: TEXT, name: "description", label: "Mô tả", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "Lưu", type: "submit", action: BTN_SUBMIT }],
    },
  ],
};

export const carModelInitialValues = {
  name: "",
  manufacturer: "",
  year: "",
  listedPrice: "",
  description: "",
};

export const carModelSearchConfig: IBaseFormConfig = {
  fields: [
    { type: TEXT, name: "name", label: "Tên dòng xe", size: 3 },
    { type: TEXT, name: "manufacturer", label: "Hãng xe", size: 3 },
    {
      type: BUTTON,
      size: 6,
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
