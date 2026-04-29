import { parseRoleDisplay } from "@/libs/utils/role.utils";
import type { UserApproveResponse } from "@/modules/accounts/shell/accounts.type";
import {
  getActionDisplay,
  getAccountStatusDisplay,
} from "@/modules/accounts/utils";

export const parsePendingApprovalTable = (data: UserApproveResponse[]) => {
  return data.map((item: UserApproveResponse) => ({
    ...item,
    role: item.roles.map((role) => parseRoleDisplay(role)).join(", "),
    actionDisplay: getActionDisplay(item.action),
    statusDisplay: getAccountStatusDisplay(item.status),
  }));
};
