import {
  BTN_SUBMIT,
  BTN_DETAIL,
  BTN_REFRESH,
  BTN_EXPORT,
} from "@/libs/constants/button.constant";
import {
  BUTTON,
  NUMBER_INPUT,
  TEXT,
  DATETIME,
} from "@/libs/constants/form.constant";
import { BUTTON as TBTN, STRING } from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";

export const paymentColumns: BaseTableColumn[] = [
  { name: "code", label: "Mã thanh toán", type: STRING },
  { name: "contractCode", label: "Hợp đồng", type: STRING },
  { name: "customerName", label: "Khách hàng", type: STRING },
  { name: "amount", label: "Số tiền", type: STRING },
  { name: "status", label: "Trạng thái", type: STRING },
  {
    name: "action",
    label: "Thao tác",
    type: TBTN,
    btnGroup: [{ title: "Chi tiết", type: "button", action: BTN_DETAIL }],
  },
];

export const paymentsFormConfig: IBaseFormConfig = {
  fields: [
    {
      type: NUMBER_INPUT,
      name: "contractId",
      label: "Mã hợp đồng",
      required: true,
      size: 12,
    },
    {
      type: NUMBER_INPUT,
      name: "amount",
      label: "Số tiền (VND)",
      required: true,
      size: 6,
    },
    { type: TEXT, name: "paymentMethod", label: "Phương thức TT", size: 6 },
    {
      type: DATETIME,
      name: "paymentTime",
      label: "Thời gian thanh toán",
      size: 12,
    },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "Tạo thanh toán", type: "submit", action: BTN_SUBMIT }],
    },
  ],
};

export const paymentsInitialValues = {
  contractId: "",
  amount: "",
  paymentMethod: "",
  paymentTime: "",
};

export const paymentSearchConfig: IBaseFormConfig = {
  fields: [
    {
      type: BUTTON,
      size: 12,
      childs: [
        {
          title: "Làm mới",
          type: "button",
          action: BTN_REFRESH,
          style: { background: "#757575", color: "#fff" },
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
