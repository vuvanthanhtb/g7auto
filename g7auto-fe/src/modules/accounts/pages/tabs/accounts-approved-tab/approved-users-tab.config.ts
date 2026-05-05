import {
  TEXT,
  SELECT,
  BUTTON,
  BTN_REFRESH,
  BTN_SEARCH,
} from "@/libs/constants";
import type { BaseTableColumn, IBaseFormConfig } from "@/libs/types";
import { NUMERICAL_ORDER, TBL_STRING } from "@/libs/constants/table.constant";
import {
  defaultSelectOption,
  userApprovalStatusOptions,
} from "@/libs/constants/options.constant";
import type { AccountApprovedSearchForm } from "./approved-users-tab.type";

export const approvedColumns: BaseTableColumn[] = [
  { name: "NUMERICAL_ORDER", label: "STT", type: NUMERICAL_ORDER },
  { name: "username", label: "Tài khoản", type: TBL_STRING },
  { name: "fullName", label: "Họ tên", type: TBL_STRING },
  { name: "email", label: "Email", type: TBL_STRING },
  { name: "actionDisplay", label: "Yêu cầu thay đổi", type: TBL_STRING },
  {
    name: "statusDisplay",
    label: "Trạng thái",
    type: TBL_STRING,
    refColor: ["statusApproving"],
  },
  {
    name: "createdAt",
    label: "Ngày tạo",
    type: TBL_STRING,
    styleCell: {
      textAlign: "center",
    },
  },
  {
    name: "updatedAt",
    label: "Ngày duyệt",
    type: TBL_STRING,
    styleCell: {
      textAlign: "center",
    },
  },
  { name: "updatedBy", label: "Người duyệt", type: TBL_STRING },
];

export const approvedSearchConfig: IBaseFormConfig = {
  fields: [
    { type: TEXT, name: "fullName", label: "Họ tên", size: 3 },
    { type: TEXT, name: "username", label: "Tài khoản", size: 3 },
    {
      type: SELECT,
      name: "statusApproving",
      label: "Trạng thái",
      option: "statusOptions",
      size: 3,
    },
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
          title: "Tìm kiếm",
          type: "button",
          action: BTN_SEARCH,
          style: { background: "#1976d2", color: "#fff" },
        },
      ],
    },
  ],
};

export const approvedInitialValues: AccountApprovedSearchForm = {
  username: "",
  fullName: "",
  statusApproving: defaultSelectOption,
  page: 1,
  size: 10,
};

export const statusOptions = [
  defaultSelectOption,
  ...userApprovalStatusOptions,
];
