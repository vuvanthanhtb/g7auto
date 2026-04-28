import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import { getContracts, createContracts, getContractsById, clearSelectedContracts } from "../shell/contracts.slice";
import { contractsService } from "../shell/contracts.service";
import type { ContractRequest } from "../shell/contracts.type";
import { contractsInitialValues } from "./contracts.config";
import { BTN_SEARCH, BTN_REFRESH, BTN_EXPORT, BTN_DETAIL, BTN_SUBMIT } from "@/libs/constants/button.constant";
import { normalizeFormValues } from "@/libs/utils";

type TableRow = Record<string, unknown>;

export const useContracts = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.contracts);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(contractsInitialValues);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<Record<string, unknown>>({});

  useEffect(() => {
    document.title = "Hợp đồng — G7Auto";
    dispatch(getContracts({ page, size: 10, ...searchParams }));
  }, [dispatch, page, searchParams]);

  useEffect(() => {
    if (selected && editId) setFormValues(selected as unknown as Record<string, unknown>);
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setFormValues(contractsInitialValues);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    dispatch(clearSelectedContracts());
  };

  const handleCellAction = (row: TableRow, key?: string) => {
    if (key === BTN_DETAIL) {
      setEditId(row.id as number);
      dispatch(getContractsById(row.id as number));
      setDrawerOpen(true);
    }
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (!editId) await dispatch(createContracts(data as unknown as ContractRequest));
    closeDrawer();
    dispatch(getContracts({ page, size: 10, ...searchParams }));
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: Record<string, unknown>) => { setSearchParams(normalizeFormValues(values)); setPage(1); },
    [BTN_REFRESH]: () => { dispatch(getContracts({ page, size: 10, ...searchParams })); },
    [BTN_EXPORT]: async () => { await contractsService.exportExcel(); },
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };

  return {
    drawerOpen, editId, formValues, page,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers,
    setFormValues, setPage,
  };
};
