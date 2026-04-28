import {
  TEXT,
  SELECT,
  BUTTON,
  BTN_REFRESH,
  BTN_SEARCH,
} from "@/libs/constants";
import type { BaseTableColumn, IBaseFormConfig } from "@/libs/types";
import { TBL_STRING } from "@/libs/constants/table.constant";

export const approvedColumns: BaseTableColumn[] = [
  { name: "username", label: "Tài khoản", type: TBL_STRING },
  { name: "fullName", label: "Họ tên", type: TBL_STRING },
  { name: "email", label: "Email", type: TBL_STRING },
  { name: "action", label: "Hành động", type: TBL_STRING },
  { name: "status", label: "Trạng thái", type: TBL_STRING },
  { name: "createdAt", label: "Ngày tạo", type: TBL_STRING },
  { name: "updatedBy", label: "Người duyệt", type: TBL_STRING },
];

export const approvedSearchConfig: IBaseFormConfig = {
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
      ],
    },
  ],
};
