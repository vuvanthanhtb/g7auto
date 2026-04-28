import {
  TEXT,
  EMAIL,
  PASSWORD,
  SELECT,
  NUMBER_INPUT,
  BUTTON,
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_SUBMIT,
  BTN_EDIT,
  BTN_LOCK,
  BTN_UNLOCK,
} from "@/libs/constants";
import type { BaseTableColumn, IBaseFormConfig } from "@/libs/types";
import { NUMERICAL_ORDER, TBL_STRING, TBL_BUTTON } from "@/libs/constants/table.constant";
import {
  defaultSelectOption,
  accountStatusOptions as baseAccountStatusOptions,
  roleOptions as baseRoleOptions,
} from "@/libs/constants/options.constant";

export const accountColumns: BaseTableColumn[] = [
  { name: "NUMERICAL_ORDER", label: "STT", type: NUMERICAL_ORDER },
  { name: "username", label: "Tài khoản", type: TBL_STRING },
  { name: "fullName", label: "Họ tên", type: TBL_STRING },
  { name: "email", label: "Email", type: TBL_STRING },
  { name: "role", label: "Vai trò", type: TBL_STRING },
  { name: "status", label: "Trạng thái", type: TBL_STRING },
  {
    name: "action",
    label: "Thao tác",
    type: TBL_BUTTON,
    btnGroup: [
      { title: "Sửa", type: "button", action: BTN_EDIT },
      { title: "Khóa", type: "button", action: BTN_LOCK },
      { title: "Mở khóa", type: "button", action: BTN_UNLOCK },
    ],
  },
];

export const accountsInitialValues = {
  username: "",
  fullName: "",
  email: "",
  password: "",
  role: "",
  showroomId: "",
};

export const accountFormConfig: IBaseFormConfig = {
  fields: [
    { type: TEXT, name: "username", label: "Tên đăng nhập", required: true, size: 6 },
    { type: TEXT, name: "fullName", label: "Họ tên", size: 6 },
    { type: EMAIL, name: "email", label: "Email", size: 6 },
    { type: PASSWORD, name: "password", label: "Mật khẩu", size: 6 },
    {
      type: SELECT,
      name: "role",
      label: "Vai trò",
      option: "roleFormOptions",
      required: true,
      size: 6,
    },
    { type: NUMBER_INPUT, name: "showroomId", label: "Showroom ID", size: 6 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "Lưu", type: "submit", action: BTN_SUBMIT }],
    },
  ],
};

export const accountSearchConfig: IBaseFormConfig = {
  fields: [
    { type: TEXT, name: "username", label: "Tài khoản", size: 3 },
    { type: TEXT, name: "email", label: "Email", size: 3 },
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

export const accountStatusOptions = [defaultSelectOption, ...baseAccountStatusOptions];
export const roleOptions = [defaultSelectOption, ...baseRoleOptions];
export const roleFormOptions = baseRoleOptions;
