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
  approveUser,
  rejectUser,
} from "@/modules/accounts/shell/accounts.slice";
import { useAppDispatch } from "@/shell/redux/hooks";
import { useState, useEffect } from "react";
import { type TableRow, normalize } from "../../account.utils";
import {
  pendingSearchConfig,
  pendingColumns,
} from "./pending-approvals-tab.config";

const PendingApprovalsTab = () => {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<Record<string, unknown>>({});

  useEffect(() => {
    dispatch(getPendingApprovals({ page, size: 10, ...searchParams }));
  }, [dispatch, page, searchParams]);

  const handleCellAction = async (row: TableRow, key?: string) => {
    if (key === BTN_APPROVE) {
      const ok = await confirm(
        `Duyệt yêu cầu của tài khoản "${row.username}"?`,
      );
      if (ok) {
        await dispatch(approveUser(row.id as string));
        dispatch(getPendingApprovals({ page, size: 10, ...searchParams }));
      }
    }
    if (key === BTN_REJECT) {
      const ok = await confirm(
        `Từ chối yêu cầu của tài khoản "${row.username}"?`,
      );
      if (ok) {
        await dispatch(rejectUser(row.id as string));
        dispatch(getPendingApprovals({ page, size: 10, ...searchParams }));
      }
    }
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: Record<string, unknown>) => {
      setSearchParams(normalize(values));
      setPage(1);
    },
    [BTN_REFRESH]: () => {
      dispatch(getPendingApprovals({ page, size: 10, ...searchParams }));
    },
  };

  return (
    <>
      <BaseFormComponent
        formConfig={pendingSearchConfig}
        options={{ userApproveActionOptions }}
        handlers={searchHandlers}
      />
      <BaseTableComponent
        tableConfig={pendingColumns}
        reducer="accounts"
        state="pendingTable"
        handleCellAction={handleCellAction}
        handlePageChange={(_, p) => setPage(p)}
      />
    </>
  );
};

export default PendingApprovalsTab;
