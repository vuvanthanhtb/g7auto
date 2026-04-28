import {
  BTN_SUBMIT,
  BTN_EDIT,
  BTN_DELETE,
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
} from "@/libs/constants/button.constant";
import { BUTTON, TEXT } from "@/libs/constants/form.constant";
import { BUTTON as TBTN, STRING } from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";

export const showroomColumns: BaseTableColumn[] = [
  { name: "name", label: "Tên showroom", type: STRING },
  { name: "address", label: "Địa chỉ", type: STRING },
  { name: "phone", label: "Điện thoại", type: STRING },
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

export const showroomFormConfig: IBaseFormConfig = {
  fields: [
    {
      type: TEXT,
      name: "name",
      label: "Tên showroom",
      required: true,
      size: 12,
    },
    { type: TEXT, name: "address", label: "Địa chỉ", required: true, size: 12 },
    { type: TEXT, name: "phone", label: "Điện thoại", size: 6 },
    { type: TEXT, name: "email", label: "Email", size: 6 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "Lưu", type: "submit", action: BTN_SUBMIT }],
    },
  ],
};

export const showroomInitialValues = {
  name: "",
  address: "",
  phone: "",
  email: "",
};

export const showroomSearchConfig: IBaseFormConfig = {
  fields: [
    { type: TEXT, name: "name", label: "Tên showroom", size: 3 },
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
