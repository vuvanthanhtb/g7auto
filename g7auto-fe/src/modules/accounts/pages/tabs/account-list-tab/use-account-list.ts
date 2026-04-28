import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import {
  searchAccounts,
  getAccountsById,
  createAccounts,
  updateAccounts,
  clearSelectedAccounts,
  lockAccount,
  unlockAccount,
} from "@/modules/accounts/shell/accounts.slice";
import { accountsService } from "@/modules/accounts/services/accounts.service";
import { useConfirm } from "@/libs/components/ui/confirm-dialog";
import { normalizeFormValues } from "@/libs/utils";
import {
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_EDIT,
  BTN_SUBMIT,
  BTN_LOCK,
  BTN_UNLOCK,
} from "@/libs/constants";
import type { AccountRequest } from "@/modules/accounts/shell/accounts.type";
import { accountsInitialValues } from "./account-list-tab.config";

type TableRow = Record<string, unknown>;

export const useAccountList = () => {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const { selected } = useAppSelector((s) => s.accounts);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(accountsInitialValues);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<Record<string, unknown>>({});

  useEffect(() => {
    dispatch(searchAccounts({ page, size: 10, ...searchParams }));
  }, [dispatch, page, searchParams]);

  useEffect(() => {
    if (selected && editId) setFormValues(selected as unknown as Record<string, unknown>);
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setFormValues(accountsInitialValues);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    dispatch(clearSelectedAccounts());
  };

  const refresh = () => dispatch(searchAccounts({ page, size: 10, ...searchParams }));

  const handleCellAction = async (row: TableRow, key?: string) => {
    if (key === BTN_EDIT) {
      setEditId(row.id as number);
      dispatch(getAccountsById(row.id as number));
      setDrawerOpen(true);
    }
    if (key === BTN_LOCK) {
      const ok = await confirm(`Khóa tài khoản "${row.username}"?`);
      if (ok) {
        await dispatch(lockAccount(row.id as number));
        refresh();
      }
    }
    if (key === BTN_UNLOCK) {
      const ok = await confirm(`Mở khóa tài khoản "${row.username}"?`);
      if (ok) {
        await dispatch(unlockAccount(row.id as number));
        refresh();
      }
    }
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    const payload = normalizeFormValues(data) as unknown as AccountRequest;
    if (editId) await dispatch(updateAccounts({ id: editId, data: payload }));
    else await dispatch(createAccounts(payload));
    closeDrawer();
    refresh();
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: Record<string, unknown>) => {
      setSearchParams(normalizeFormValues(values));
      setPage(1);
    },
    [BTN_REFRESH]: () => refresh(),
    [BTN_EXPORT]: async () => { await accountsService.exportExcel(); },
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };

  return {
    drawerOpen, editId, formValues, page,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers,
    setFormValues, setPage,
  };
};
