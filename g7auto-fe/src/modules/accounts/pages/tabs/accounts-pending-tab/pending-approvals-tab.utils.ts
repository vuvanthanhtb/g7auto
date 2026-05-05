import { parseRoleDisplay } from "@/libs/utils/role.utils";
import {
  getActionDisplay,
  getAccountStatusDisplay,
} from "@/modules/accounts/utils";
import type {
  AccountPendingSearchForm,
  AccountPendingSearchQuery,
  AccountPendingTable,
} from "./pending-approvals-tab.type";

export const parsePendingApprovalTable = (data: AccountPendingTable[]) => {
  return data.map((item: AccountPendingTable) => ({
    ...item,
    role: item.roles.map((role) => parseRoleDisplay(role)).join(", "),
    actionDisplay: getActionDisplay(item.action),
    statusDisplay: getAccountStatusDisplay(item.status),
  }));
};

export const parsePendingAccountsFormSearch = (
  data: AccountPendingSearchForm,
) => {
  const params: AccountPendingSearchQuery = {
    page: data.page,
    size: data.size,
  };

  if (data.fullName) {
    params["fullName"] = data.fullName;
  }

  if (data.username) {
    params["username"] = data.username;
  }

  if (data.fromDate) {
    params["fromDate"] = data.fromDate;
  }

  if (data.toDate) {
    params["toDate"] = data.toDate;
  }

  return params;
};
