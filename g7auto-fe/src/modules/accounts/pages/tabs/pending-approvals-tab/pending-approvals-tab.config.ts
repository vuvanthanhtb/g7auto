import {
  BTN_APPROVE,
  BTN_REJECT,
  TEXT,
  SELECT,
  BUTTON,
  BTN_SEARCH,
  BTN_REFRESH,
} from "@/libs/constants";
import type { BaseTableColumn, IBaseFormConfig } from "@/libs/types";
import { TBL_STRING, TBL_BUTTON } from "@/libs/constants/table.constant";

export const pendingColumns: BaseTableColumn[] = [
  { name: "username", label: "Tài khoản", type: TBL_STRING },
  { name: "fullName", label: "Họ tên", type: TBL_STRING },
  { name: "email", label: "Email", type: TBL_STRING },
  { name: "action", label: "Hành động", type: TBL_STRING },
  { name: "createdAt", label: "Ngày tạo", type: TBL_STRING },
  { name: "createdBy", label: "Người tạo", type: TBL_STRING },
  {
    name: "action_btn",
    label: "Thao tác",
    type: TBL_BUTTON,
    btnGroup: [
      { title: "Duyệt", type: "button", action: BTN_APPROVE },
      { title: "Từ chối", type: "button", action: BTN_REJECT },
    ],
  },
];

export const pendingSearchConfig: IBaseFormConfig = {
  fields: [
    { type: TEXT, name: "createdBy", label: "Người tạo", size: 3 },
    {
      type: SELECT,
      name: "action",
      label: "Hành động",
      option: "userApproveActionOptions",
      size: 3,
    },
    {
      type: BUTTON,
      size: 6,
      childs: [
        {
          title: "Tìm kiếm",
          type: "button",
          action: BTN_SEARCH,
          style: { background: "#1976d2", color: "#fff" },
        },
        {
          title: "Làm mới",
          type: "button",
          action: BTN_REFRESH,
          style: { background: "#757575", color: "#fff" },
        },
      ],
    },
  ],
};
