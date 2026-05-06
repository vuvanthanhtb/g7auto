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
import { t } from "@/libs/i18n";

export const getPendingColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: t("LABEL_STT"), type: NUMERICAL_ORDER },
  { name: "username", label: t("LABEL_ACCOUNT"), type: TBL_STRING },
  { name: "fullName", label: t("LABEL_FULL_NAME"), type: TBL_STRING },
  { name: "email", label: t("LABEL_EMAIL"), type: TBL_STRING },
  { name: "role", label: t("LABEL_ROLE"), type: TBL_STRING },
  { name: "statusDisplay", label: t("LABEL_STATUS"), type: TBL_STRING },
  {
    name: "actionDisplay",
    label: t("LABEL_CHANGE_REQUEST"),
    type: TBL_STRING,
    styleCell: { color: "#cb1010" },
  },
  {
    name: "createdAt",
    label: t("LABEL_CREATED_AT"),
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
  { name: "createdBy", label: t("LABEL_CREATED_BY"), type: TBL_STRING },
  {
    name: "action_btn",
    label: t("LABEL_ACTION"),
    type: TBL_BUTTON,
    btnGroup: [
      { title: t("BTN_APPROVE_ACTION"), type: "button", action: BTN_APPROVE },
      {
        title: t("BTN_REJECT_ACTION"),
        type: "button",
        action: BTN_REJECT,
        style: { background: "#dc004e", color: "#fff" },
      },
    ],
  },
];

export const getPendingSearchConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "fullName", label: t("LABEL_FULL_NAME"), size: 3 },
    { type: TEXT, name: "username", label: t("LABEL_ACCOUNT"), size: 3 },
    {
      type: BUTTON,
      size: 3,
      style: { justifyContent: "flex-start" },
      childs: [
        {
          title: t("BTN_REFRESH_ACTION"),
          type: "button",
          action: BTN_REFRESH,
          style: { background: "#757575", color: "#fff" },
        },
        {
          title: t("BTN_SEARCH_ACTION"),
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
