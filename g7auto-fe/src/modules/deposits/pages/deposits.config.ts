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
  DATE,
  SELECT,
} from "@/libs/constants/form.constant";
import { BUTTON as TBTN, STRING } from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";

export const depositColumns: BaseTableColumn[] = [
  { name: "code", label: "Mã đặt cọc", type: STRING },
  { name: "customerName", label: "Khách hàng", type: STRING },
  { name: "carName", label: "Xe", type: STRING },
  { name: "amount", label: "Số tiền", type: STRING },
  { name: "status", label: "Trạng thái", type: STRING },
  {
    name: "action",
    label: "Thao tác",
    type: TBTN,
    btnGroup: [{ title: "Chi tiết", type: "button", action: BTN_DETAIL }],
  },
];

export const depositsFormConfig: IBaseFormConfig = {
  fields: [
    {
      type: NUMBER_INPUT,
      name: "customerId",
      label: "Mã khách hàng",
      required: true,
      size: 6,
    },
    {
      type: NUMBER_INPUT,
      name: "carId",
      label: "Mã xe",
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
    {
      type: NUMBER_INPUT,
      name: "employeeId",
      label: "Mã nhân viên",
      required: true,
      size: 6,
    },
    {
      type: NUMBER_INPUT,
      name: "amount",
      label: "Số tiền cọc (VND)",
      required: true,
      size: 12,
    },
    { type: DATE, name: "depositDate", label: "Ngày đặt cọc", size: 6 },
    { type: DATE, name: "expiredDate", label: "Ngày hết hạn", size: 6 },
    {
      type: BUTTON,
      size: 12,
      childs: [
        { title: "Tạo phiếu đặt cọc", type: "submit", action: BTN_SUBMIT },
      ],
    },
  ],
};

export const depositsInitialValues = {
  customerId: "",
  carId: "",
  showroomId: "",
  employeeId: "",
  amount: "",
  depositDate: "",
  expiredDate: "",
};

export const depositSearchConfig: IBaseFormConfig = {
  fields: [
    {
      type: SELECT,
      name: "status",
      label: "Trạng thái",
      option: "depositStatusOptions",
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
