import {
  TEXT,
  SELECT,
  BUTTON,
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_LOCK,
  BTN_UNLOCK,
  BTN_ACTIVE,
  ACTIVE,
  LOCKED,
  INACTIVE,
  BTN_INACTIVE,
} from "@/libs/constants";
import type { BaseTableColumn, IBaseFormConfig } from "@/libs/types";
import {
  NUMERICAL_ORDER,
  TBL_STRING,
  TBL_BUTTON,
} from "@/libs/constants/table.constant";
import {
  defaultSelectOption,
  accountStatusOptions as baseAccountStatusOptions,
  roleOptions as baseRoleOptions,
} from "@/libs/constants/options.constant";
import type { AccountSearchForm } from "./account-list-tab.type";

export const accountColumns: BaseTableColumn[] = [
  { name: "NUMERICAL_ORDER", label: "STT", type: NUMERICAL_ORDER },
  { name: "username", label: "Tài khoản", type: TBL_STRING },
  { name: "fullName", label: "Họ tên", type: TBL_STRING },
  { name: "email", label: "Email", type: TBL_STRING },
  { name: "role", label: "Vai trò", type: TBL_STRING },
  { name: "statusDisplay", label: "Trạng thái", type: TBL_STRING },
  {
    name: "createdAt",
    label: "Ngày tạo",
    type: TBL_STRING,
    styleCell: {
      textAlign: "center",
    },
  },
  {
    name: "createdBy",
    label: "Người tạo",
    type: TBL_STRING,
    styleCell: {
      minWidth: 100,
    },
  },
  {
    name: "updatedAt",
    label: "Ngày cập nhật",
    type: TBL_STRING,
    styleCell: {
      textAlign: "center",
    },
  },
  {
    name: "updatedBy",
    label: "Người cập nhật",
    type: TBL_STRING,
    styleCell: {
      minWidth: 120,
    },
  },
  {
    name: "action",
    label: "Thao tác",
    type: TBL_BUTTON,
    btnGroup: [
      {
        title: "Hoạt động",
        type: "button",
        action: BTN_ACTIVE,
        refShow: ["status"],
        style: { background: "#2e7d32", color: "#fff" },
      },
      {
        title: "Ngừng hoạt động",
        type: "button",
        action: BTN_INACTIVE,
        refShow: ["status"],
        style: { background: "#ed6c02", color: "#fff" },
      },
      {
        title: "Khóa",
        type: "button",
        action: BTN_LOCK,
        refShow: ["status"],
        style: { background: "#d32f2f", color: "#fff" },
      },
      {
        title: "Mở khóa",
        type: "button",
        action: BTN_UNLOCK,
        refShow: ["status"],
        style: { background: "#0288d1", color: "#fff" },
      },
    ],
  },
];

export const showButtons = (
  refShow: string[],
  action: string,
  row: Record<string, unknown>,
) => {
  const status = row[refShow[0]] as string;

  if (status === ACTIVE && [BTN_INACTIVE, BTN_LOCK].includes(action)) {
    return true;
  }

  if (status === LOCKED && [BTN_UNLOCK, BTN_INACTIVE].includes(action)) {
    return true;
  }

  if (status === INACTIVE && [BTN_ACTIVE].includes(action)) {
    return true;
  }

  return false;
};

export const accountsInitialValues: AccountSearchForm = {
  username: "",
  fullName: "",
  status: defaultSelectOption,
  role: defaultSelectOption,
  page: 1,
  size: 10,
};

export const accountSearchConfig: IBaseFormConfig = {
  fields: [
    { type: TEXT, name: "fullName", label: "Họ tên", size: 3 },
    { type: TEXT, name: "username", label: "Tài khoản", size: 3 },
    {
      type: SELECT,
      name: "status",
      label: "Trạng thái",
      option: "accountStatusOptions",
      size: 3,
    },
    {
      type: SELECT,
      name: "role",
      label: "Vai trò",
      option: "roleOptions",
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

export const accountStatusOptions = [
  defaultSelectOption,
  ...baseAccountStatusOptions,
];
export const roleOptions = [defaultSelectOption, ...baseRoleOptions];
export const roleFormOptions = baseRoleOptions;
