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

export const getAccountColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "username", label: "COMMON_LABEL_ACCOUNT", type: TBL_STRING },
  { name: "fullName", label: "COMMON_LABEL_FULL_NAME", type: TBL_STRING },
  { name: "email", label: "COMMON_LABEL_EMAIL", type: TBL_STRING },
  { name: "role", label: "COMMON_LABEL_ROLE", type: TBL_STRING },
  { name: "statusDisplay", label: "COMMON_LABEL_STATUS", type: TBL_STRING },
  {
    name: "createdAt",
    label: "COMMON_LABEL_CREATED_AT",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
  {
    name: "createdBy",
    label: "COMMON_LABEL_CREATED_BY",
    type: TBL_STRING,
    styleCell: { minWidth: 100 },
  },
  {
    name: "updatedAt",
    label: "COMMON_LABEL_UPDATED_AT",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
  {
    name: "updatedBy",
    label: "COMMON_LABEL_UPDATED_BY",
    type: TBL_STRING,
    styleCell: { minWidth: 120 },
  },
  {
    name: "action",
    label: "COMMON_LABEL_ACTION",
    type: TBL_BUTTON,
    btnGroup: [
      {
        title: "COMMON_BTN_ACTIVE",
        type: "button",
        action: BTN_ACTIVE,
        refShow: ["status"],
        style: { background: "#2e7d32", color: "#fff" },
      },
      {
        title: "COMMON_BTN_INACTIVE",
        type: "button",
        action: BTN_INACTIVE,
        refShow: ["status"],
        style: { background: "#ed6c02", color: "#fff" },
      },
      {
        title: "COMMON_BTN_LOCK",
        type: "button",
        action: BTN_LOCK,
        refShow: ["status"],
        style: { background: "#d32f2f", color: "#fff" },
      },
      {
        title: "COMMON_BTN_UNLOCK",
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

export const getAccountSearchConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "fullName", label: "COMMON_LABEL_FULL_NAME", size: 3 },
    { type: TEXT, name: "username", label: "COMMON_LABEL_ACCOUNT", size: 3 },
    {
      type: SELECT,
      name: "status",
      label: "COMMON_LABEL_STATUS",
      option: "accountStatusOptions",
      size: 3,
    },
    {
      type: SELECT,
      name: "role",
      label: "COMMON_LABEL_ROLE",
      option: "roleOptions",
      size: 3,
    },
    {
      type: BUTTON,
      size: 12,
      childs: [
        {
          title: "COMMON_BTN_REFRESH",
          type: "button",
          action: BTN_REFRESH,
          style: { background: "#757575", color: "#fff" },
        },
        {
          title: "COMMON_BTN_SEARCH",
          type: "button",
          action: BTN_SEARCH,
          style: { background: "#1976d2", color: "#fff" },
        },
        {
          title: "COMMON_BTN_EXPORT",
          type: "button",
          action: BTN_EXPORT,
          style: { background: "#2e7d32", color: "#fff" },
        },
      ],
    },
  ],
});

export const accountStatusOptions = [
  defaultSelectOption,
  ...baseAccountStatusOptions,
];
export const roleOptions = [defaultSelectOption, ...baseRoleOptions];
export const roleFormOptions = baseRoleOptions;
