import { parseRoleDisplay } from "@/libs/utils/role.utils";
import { getAccountStatusDisplay } from "@/modules/accounts/utils";
import type {
  AccountSearchForm,
  AccountSearchQuery,
  AccountTable,
} from "./account-list-tab.type";

export const parseDataTable = (data: AccountTable[]) => {
  return data.map((item: AccountTable) => ({
    ...item,
    role: item.roles.map((role) => parseRoleDisplay(role)).join(", "),
    statusDisplay: getAccountStatusDisplay(item.status),
  }));
};

export const parseAccountsFormSearch = (data: AccountSearchForm) => {
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

  if (data.status?.value) {
    params["status"] = data.status.value;
  }

  if (data.role?.value) {
    params["role"] = data.role.value;
  }

  return params;
};
