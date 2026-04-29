import BaseFormComponent from "@/libs/components/ui/base-form";
import BaseTableComponent from "@/libs/components/ui/base-table";
import { useConfirm } from "@/libs/components/ui/confirm-dialog";
import {
  BTN_APPROVE,
  BTN_REJECT,
  BTN_SEARCH,
  BTN_REFRESH,
} from "@/libs/constants";
import { userApproveActionOptions } from "@/libs/constants/options.constant";
import {
  getPendingApprovals,
  requestApproval,
} from "@/modules/accounts/shell/accounts.slice";
import { useAppDispatch } from "@/shell/redux/hooks";
import { useState, useEffect } from "react";
import { type TableRow } from "../../account.utils";
import {
  pendingSearchConfig,
  pendingColumns,
  pendingInitialValues,
} from "./pending-approvals-tab.config";
import type { AccountPendingSearchForm } from "./pending-approvals-tab.type";

const PendingApprovalsTab = () => {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const [searchParams, setSearchParams] =
    useState<AccountPendingSearchForm>(pendingInitialValues);

  useEffect(() => {
    dispatch(getPendingApprovals(pendingInitialValues));
  }, [dispatch]);

  const handleCellAction = async (row: TableRow, key?: string) => {
    const username = row.username as string;
    if (!username) return;
    if (key === BTN_APPROVE) {
      const ok = await confirm(`Duyệt yêu cầu của tài khoản "${username}"?`);
      if (ok) {
        await dispatch(requestApproval({ username, action: "APPROVE" }));
        dispatch(getPendingApprovals(searchParams));
      }
    }
    if (key === BTN_REJECT) {
      const ok = await confirm(`Từ chối yêu cầu của tài khoản "${username}"?`);
      if (ok) {
        await dispatch(requestApproval({ username, action: "REJECT" }));
        dispatch(getPendingApprovals(searchParams));
      }
    }
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: AccountPendingSearchForm) => {
      setSearchParams(values);
      dispatch(getPendingApprovals({ ...values, page: 1 }));
    },
    [BTN_REFRESH]: () => {
      dispatch(getPendingApprovals(pendingInitialValues));
    },
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ ...searchParams, page });
    dispatch(getPendingApprovals({ ...searchParams, page }));
  };

  const onchange = (values: AccountPendingSearchForm) => {
    setSearchParams(values);
  };

  return (
    <>
      <BaseFormComponent<AccountPendingSearchForm>
        formConfig={pendingSearchConfig}
        options={{ userApproveActionOptions }}
        handlers={searchHandlers}
        onChange={onchange}
      />
      <BaseTableComponent
        tableConfig={pendingColumns}
        reducer="accounts"
        state="pendingTable"
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default PendingApprovalsTab;
