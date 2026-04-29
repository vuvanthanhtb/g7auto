import { parseRoleDisplay } from "@/libs/utils/role.utils";
import type {
  AccountSearchQuery,
  UserApproveResponse,
} from "@/modules/accounts/shell/accounts.type";
import {
  getActionDisplay,
  getAccountApprovalStatusDisplay,
} from "@/modules/accounts/utils";
import type { AccountApprovalQuery } from "./approved-users-tab.type";

export const parseApprovalTable = (data: UserApproveResponse[]) => {
  return data.map((item: UserApproveResponse) => ({
    ...item,
    role: item.roles.map((role) => parseRoleDisplay(role)).join(", "),
    actionDisplay: getActionDisplay(item.action),
    statusDisplay: getAccountApprovalStatusDisplay(item.statusApproving),
  }));
};

export const parseApprovedUsersFormSearch = (data: AccountApprovalQuery) => {
  const params: AccountSearchQuery = {
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

  return params;
};
