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

export const getPendingColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "username", label: "COMMON_LABEL_ACCOUNT", type: TBL_STRING },
  { name: "fullName", label: "COMMON_LABEL_FULL_NAME", type: TBL_STRING },
  { name: "email", label: "COMMON_LABEL_EMAIL", type: TBL_STRING },
  { name: "role", label: "COMMON_LABEL_ROLE", type: TBL_STRING },
  { name: "statusDisplay", label: "COMMON_LABEL_STATUS", type: TBL_STRING },
  {
    name: "actionDisplay",
    label: "COMMON_LABEL_CHANGE_REQUEST",
    type: TBL_STRING,
    styleCell: { color: "#cb1010" },
  },
  {
    name: "createdAt",
    label: "COMMON_LABEL_CREATED_AT",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
  { name: "createdBy", label: "COMMON_LABEL_CREATED_BY", type: TBL_STRING },
  {
    name: "action_btn",
    label: "COMMON_LABEL_ACTION",
    type: TBL_BUTTON,
    btnGroup: [
      { title: "COMMON_BTN_APPROVE", type: "button", action: BTN_APPROVE },
      {
        title: "COMMON_BTN_REJECT",
        type: "button",
        action: BTN_REJECT,
        style: { background: "#dc004e", color: "#fff" },
      },
    ],
  },
];

export const getPendingSearchConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "fullName", label: "COMMON_LABEL_FULL_NAME", size: 3 },
    { type: TEXT, name: "username", label: "COMMON_LABEL_ACCOUNT", size: 3 },
    {
      type: BUTTON,
      size: 3,
      style: { justifyContent: "flex-start" },
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
      ],
    },
  ],
});

export const pendingInitialValues: AccountPendingSearchForm = {
  username: "",
  fullName: "",
  page: 1,
  size: 10,
};
