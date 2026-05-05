import {
  BTN_APPROVE,
  BTN_REJECT,
  TEXT,
  BUTTON,
  BTN_SEARCH,
  BTN_REFRESH,
} from "@/libs/constants";
import type { BaseTableColumn, IBaseFormConfig } from "@/libs/types";
import {
  TBL_STRING,
  TBL_BUTTON,
  NUMERICAL_ORDER,
} from "@/libs/constants/table.constant";
import type { AccountPendingSearchForm } from "./pending-approvals-tab.type";

export const pendingColumns: BaseTableColumn[] = [
  { name: "NUMERICAL_ORDER", label: "STT", type: NUMERICAL_ORDER },
  { name: "username", label: "Tài khoản", type: TBL_STRING },
  { name: "fullName", label: "Họ tên", type: TBL_STRING },
  { name: "email", label: "Email", type: TBL_STRING },
  { name: "role", label: "Vai trò", type: TBL_STRING },
  { name: "statusDisplay", label: "Trạng thái", type: TBL_STRING },
  {
    name: "actionDisplay",
    label: "Yêu cầu thay đổi",
    type: TBL_STRING,
    styleCell: {
      color: "#cb1010",
    },
  },
  {
    name: "createdAt",
    label: "Ngày tạo",
    type: TBL_STRING,
    styleCell: {
      textAlign: "center",
    },
  },
  { name: "createdBy", label: "Người tạo", type: TBL_STRING },
  {
    name: "action_btn",
    label: "Thao tác",
    type: TBL_BUTTON,
    btnGroup: [
      { title: "Duyệt", type: "button", action: BTN_APPROVE },
      {
        title: "Từ chối",
        type: "button",
        action: BTN_REJECT,
        style: { background: "#dc004e", color: "#fff" },
      },
    ],
  },
];

export const pendingSearchConfig: IBaseFormConfig = {
  fields: [
    { type: TEXT, name: "fullName", label: "Họ tên", size: 3 },
    { type: TEXT, name: "username", label: "Tài khoản", size: 3 },
    {
      type: BUTTON,
      size: 3,
      style: {
        justifyContent: "flex-start",
      },
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

export const pendingInitialValues: AccountPendingSearchForm = {
  username: "",
  fullName: "",
  page: 1,
  size: 10,
};
