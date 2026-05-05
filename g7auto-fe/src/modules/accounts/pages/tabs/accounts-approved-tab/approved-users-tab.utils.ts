import { parseRoleDisplay } from "@/libs/utils/role.utils";
import {
  getActionDisplay,
  getAccountApprovalStatusDisplay,
} from "@/modules/accounts/utils";
import type {
  AccountApprovedSearchForm,
  AccountApprovedSearchQuery,
  AccountApprovedTable,
} from "./approved-users-tab.type";

export const parseApprovalTable = (data: AccountApprovedTable[]) => {
  return data.map((item: AccountApprovedTable) => ({
    ...item,
    role: item.roles.map((role) => parseRoleDisplay(role)).join(", "),
    actionDisplay: getActionDisplay(item.action),
    statusDisplay: getAccountApprovalStatusDisplay(item.statusApproving),
  }));
};

export const parseApprovedAccountsFormSearch = (
  data: AccountApprovedSearchForm,
) => {
  const params: AccountApprovedSearchQuery = {
    page: data.page,
    size: data.size,
  };

  if (data.fullName) {
    params["fullName"] = data.fullName;
  }

  if (data.username) {
    params["username"] = data.username;
  }

  if (data.statusApproving?.value) {
    params["statusApproving"] = data.statusApproving.value;
  }

  if (data.fromDate) {
    params["fromDate"] = data.fromDate;
  }

  if (data.toDate) {
    params["toDate"] = data.toDate;
  }

  return params;
};
