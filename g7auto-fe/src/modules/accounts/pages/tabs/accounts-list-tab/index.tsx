import BaseFormComponent from "@/libs/components/ui/base-form";
import BaseTableComponent from "@/libs/components/ui/base-table";
import {
  accountSearchConfig,
  accountColumns,
  accountStatusOptions,
  roleOptions,
  showButtons,
} from "./account-list-tab.config";
import { useAccountList } from "./use-account-list";
import TableTitleComponent from "@/libs/components/ui/table-title";
import type { AccountSearchForm } from "./account-list-tab.type";

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
        formConfig={accountSearchConfig}
        options={{ accountStatusOptions, roleOptions }}
        handlers={searchHandlers}
        onChange={onchange}
        values={searchParams}
      />
      <TableTitleComponent title="Danh sách tài khoản" />
      <BaseTableComponent
        tableConfig={accountColumns}
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
