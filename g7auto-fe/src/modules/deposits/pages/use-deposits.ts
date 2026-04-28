import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import { getDeposits, createDeposits, getDepositsById, clearSelectedDeposits } from "../shell/deposits.slice";
import { depositsService } from "../shell/deposits.service";
import type { DepositRequest } from "../shell/deposits.type";
import { depositsInitialValues } from "./deposits.config";
import { BTN_SEARCH, BTN_REFRESH, BTN_EXPORT, BTN_DETAIL, BTN_SUBMIT } from "@/libs/constants/button.constant";
import { normalizeFormValues } from "@/libs/utils";

type TableRow = Record<string, unknown>;

export const useDeposits = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.deposits);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(depositsInitialValues);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<Record<string, unknown>>({});

  useEffect(() => {
    document.title = "Đặt cọc — G7Auto";
    dispatch(getDeposits({ page, size: 10, ...searchParams }));
  }, [dispatch, page, searchParams]);

  useEffect(() => {
    if (selected && editId) setFormValues(selected as unknown as Record<string, unknown>);
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setFormValues(depositsInitialValues);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    dispatch(clearSelectedDeposits());
  };

  const handleCellAction = (row: TableRow, key?: string) => {
    if (key === BTN_DETAIL) {
      setEditId(row.id as number);
      dispatch(getDepositsById(row.id as number));
      setDrawerOpen(true);
    }
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (!editId) await dispatch(createDeposits(data as unknown as DepositRequest));
    closeDrawer();
    dispatch(getDeposits({ page, size: 10, ...searchParams }));
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: Record<string, unknown>) => { setSearchParams(normalizeFormValues(values)); setPage(1); },
    [BTN_REFRESH]: () => { dispatch(getDeposits({ page, size: 10, ...searchParams })); },
    [BTN_EXPORT]: async () => { await depositsService.exportExcel(); },
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };

  return {
    drawerOpen, editId, formValues, page,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers,
    setFormValues, setPage,
  };
};
