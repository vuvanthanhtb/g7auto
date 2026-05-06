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
import TableTitleComponent from "@/libs/components/ui/table-title";
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
      <TableTitleComponent title={t("ACCOUNTS_TAB_LIST")} />
      <BaseTableComponent
        tableConfig={getAccountColumns()}
        reducer="accounts"
        state="accountTable"
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
        showButton={showButtons}
      />
    </>
  );
};

export default AccountsListTab;
