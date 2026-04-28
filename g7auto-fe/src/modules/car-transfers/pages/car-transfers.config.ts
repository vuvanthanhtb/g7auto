import {
  BTN_SUBMIT,
  BTN_DETAIL,
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
} from "@/libs/constants/button.constant";
import { BUTTON, NUMBER_INPUT, SELECT } from "@/libs/constants/form.constant";
import { BUTTON as TBTN, STRING } from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";

export const carTransferColumns: BaseTableColumn[] = [
  { name: "carName", label: "Xe", type: STRING },
  { name: "fromShowroomName", label: "Từ showroom", type: STRING },
  { name: "toShowroomName", label: "Đến showroom", type: STRING },
  { name: "status", label: "Trạng thái", type: STRING },
  { name: "transferDate", label: "Ngày chuyển", type: STRING },
  {
    name: "action",
    label: "Thao tác",
    type: TBTN,
    btnGroup: [{ title: "Chi tiết", type: "button", action: BTN_DETAIL }],
  },
];

export const carTransfersFormConfig: IBaseFormConfig = {
  fields: [
    {
      type: NUMBER_INPUT,
      name: "carId",
      label: "Mã xe",
      required: true,
      size: 12,
    },
    {
      type: NUMBER_INPUT,
      name: "fromShowroomId",
      label: "Từ showroom (ID)",
      required: true,
      size: 6,
    },
    {
      type: NUMBER_INPUT,
      name: "toShowroomId",
      label: "Đến showroom (ID)",
      required: true,
      size: 6,
    },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "Tạo phiếu", type: "submit", action: BTN_SUBMIT }],
    },
  ],
};

export const carTransfersInitialValues = {
  carId: "",
  fromShowroomId: "",
  toShowroomId: "",
};

export const carTransferSearchConfig: IBaseFormConfig = {
  fields: [
    {
      type: SELECT,
      name: "status",
      label: "Trạng thái",
      option: "transferStatusOptions",
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
