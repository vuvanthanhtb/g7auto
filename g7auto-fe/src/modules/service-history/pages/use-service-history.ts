import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import { getServiceHistory, createServiceHistory, getServiceHistoryById, clearSelectedServiceHistory } from "../shell/service-history.slice";
import { serviceHistoryService } from "../shell/service-history.service";
import type { ServiceHistoryRequest } from "../shell/service-history.type";
import { serviceHistoryInitialValues } from "./service-history.config";
import { BTN_REFRESH, BTN_EXPORT, BTN_EDIT, BTN_SUBMIT } from "@/libs/constants/button.constant";

type TableRow = Record<string, unknown>;

export const useServiceHistory = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.serviceHistory);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(serviceHistoryInitialValues);
  const [page, setPage] = useState(1);

  useEffect(() => {
    document.title = "Lịch sử dịch vụ — G7Auto";
    dispatch(getServiceHistory({ page, size: 10 }));
  }, [dispatch, page]);

  useEffect(() => {
    if (selected && editId) setFormValues(selected as unknown as Record<string, unknown>);
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setFormValues(serviceHistoryInitialValues);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    dispatch(clearSelectedServiceHistory());
  };

  const handleCellAction = (row: TableRow, key?: string) => {
    if (key === BTN_EDIT) {
      setEditId(row.id as number);
      dispatch(getServiceHistoryById(row.id as number));
      setDrawerOpen(true);
    }
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (!editId) await dispatch(createServiceHistory(data as unknown as ServiceHistoryRequest));
    closeDrawer();
    dispatch(getServiceHistory({ page, size: 10 }));
  };

  const searchHandlers = {
    [BTN_REFRESH]: () => { dispatch(getServiceHistory({ page, size: 10 })); },
    [BTN_EXPORT]: async () => { await serviceHistoryService.exportExcel(); },
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };

  return {
    drawerOpen, editId, formValues, page,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers,
    setFormValues, setPage,
  };
};
