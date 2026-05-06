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

export const getApprovedColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "username", label: "COMMON_LABEL_ACCOUNT", type: TBL_STRING },
  { name: "fullName", label: "COMMON_LABEL_FULL_NAME", type: TBL_STRING },
  { name: "email", label: "COMMON_LABEL_EMAIL", type: TBL_STRING },
  { name: "actionDisplay", label: "COMMON_LABEL_CHANGE_REQUEST", type: TBL_STRING },
  {
    name: "statusDisplay",
    label: "COMMON_LABEL_STATUS",
    type: TBL_STRING,
    refColor: ["statusApproving"],
  },
  {
    name: "createdAt",
    label: "COMMON_LABEL_CREATED_AT",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
  {
    name: "updatedAt",
    label: "COMMON_LABEL_APPROVED_AT",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
  { name: "updatedBy", label: "COMMON_LABEL_APPROVED_BY", type: TBL_STRING },
];

export const getApprovedSearchConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "fullName", label: "COMMON_LABEL_FULL_NAME", size: 3 },
    { type: TEXT, name: "username", label: "COMMON_LABEL_ACCOUNT", size: 3 },
    {
      type: SELECT,
      name: "statusApproving",
      label: "COMMON_LABEL_STATUS",
      option: "statusOptions",
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
      ],
    },
  ],
});

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
