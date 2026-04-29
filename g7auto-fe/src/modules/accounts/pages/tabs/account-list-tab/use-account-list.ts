import { useEffect, useState } from "react";
import { useAppDispatch } from "@/shell/redux/hooks";
import {
  changeUserStatus,
  searchAccounts,
} from "@/modules/accounts/shell/accounts.slice";
import { accountsService } from "@/modules/accounts/services/accounts.service";
import {
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_ACTIVE,
  BTN_LOCK,
  BTN_INACTIVE,
  BTN_UNLOCK,
} from "@/libs/constants";
import { accountsInitialValues } from "./account-list-tab.config";
import { useConfirm } from "@/libs/components/ui/confirm-dialog";
import type { AccountSearchForm } from "./account-list-tab.type";

type TableRow = Record<string, unknown>;

export const useAccountList = () => {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const [searchParams, setSearchParams] = useState<AccountSearchForm>(
    accountsInitialValues,
  );

  useEffect(() => {
    dispatch(searchAccounts(accountsInitialValues));
  }, [dispatch]);

  const refresh = () => {
    setSearchParams(accountsInitialValues);
    dispatch(searchAccounts(accountsInitialValues));
  };

  const handleCellAction = async (row: TableRow, key?: string) => {
    const username = row.username as string;
    if (!username) return;

    if (key === BTN_ACTIVE) {
      const ok = await confirm(`Kích hoạt tài khoản "${username}"?`);
      if (ok) {
        await dispatch(changeUserStatus({ username, action: "ACTIVE" }));
        refresh();
      }
    } else if (key === BTN_INACTIVE) {
      const ok = await confirm(
        `Bạn có chắc chắn muốn vô hiệu hóa tài khoản "${username}"?`,
      );
      if (ok) {
        await dispatch(changeUserStatus({ username, action: "INACTIVE" }));
        refresh();
      }
    } else if (key === BTN_LOCK) {
      const ok = await confirm(`Khóa tài khoản "${username}"?`);
      if (ok) {
        await dispatch(changeUserStatus({ username, action: "LOCK" }));
        refresh();
      }
    } else if (key === BTN_UNLOCK) {
      const ok = await confirm(`Mở khóa tài khoản "${username}"?`);
      if (ok) {
        await dispatch(changeUserStatus({ username, action: "UNLOCK" }));
        refresh();
      }
    }
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: AccountSearchForm) => {
      setSearchParams(values);
      dispatch(searchAccounts({ ...values, page: 1 }));
    },
    [BTN_REFRESH]: () => refresh(),
    [BTN_EXPORT]: async () => {
      await accountsService.exportExcel();
    },
  };

  const handlePageChange = (page: number) => {
    dispatch(searchAccounts({ ...searchParams, page }));
  };

  const onchange = (values: AccountSearchForm) => {
    setSearchParams(values);
  };

  return {
    handleCellAction,
    searchHandlers,
    handlePageChange,
    onchange,
    searchParams,
  };
};
