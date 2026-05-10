import BaseFormComponent from "@/libs/components/ui/base-form";
import BaseTableComponent from "@/libs/components/ui/base-table";
import {
  getAccountSearchConfig,
  getAccountColumns,
  accountStatusOptions,
  roleOptions,
  showButtons,
} from "./account-list-tab.config";
import { useAccountList } from "./use-account-list";
import type { AccountSearchForm } from "./account-list-tab.type";
import { t } from "@/libs/i18n";

const AccountsListTab = () => {
  const {
    handleCellAction,
    searchHandlers,
    handlePageChange,
    onchange,
    searchParams,
  } = useAccountList();

  return (
    <>
      <BaseFormComponent<AccountSearchForm>
        formConfig={getAccountSearchConfig()}
        options={{ accountStatusOptions, roleOptions }}
        handlers={searchHandlers}
        onChange={onchange}
        values={searchParams}
      />
      <BaseTableComponent
        tableConfig={getAccountColumns()}
        reducer="accounts"
        state="accountTable"
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
        showButton={showButtons}
        title={t("ACCOUNTS_TAB_LIST")}
      />
    </>
  );
};

export default AccountsListTab;
