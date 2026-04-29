import { parseRoleDisplay } from "@/libs/utils/role.utils";
import { getAccountStatusDisplay } from "@/modules/accounts/utils";
import type { AccountTableResponse } from "./account-list-tab.type";

export const parseDataTable = (data: AccountTableResponse[]) => {
  return data.map((item: AccountTableResponse) => ({
    ...item,
    role: item.roles.map((role) => parseRoleDisplay(role)).join(", "),
    statusDisplay: getAccountStatusDisplay(item.status),
  }));
};
