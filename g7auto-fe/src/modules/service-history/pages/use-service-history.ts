import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import { getServiceHistory, createServiceHistory, getServiceHistoryById, clearSelectedServiceHistory, exportServiceHistory } from "../shell/service-history.slice";
import type { ServiceHistoryFormValues, ServiceHistoryRequest, ServiceHistorySearchForm } from "../shell/service-history.type";
import { serviceHistoryInitialValues, initServiceHistorySearchForm } from "./service-history.config";
import { BTN_REFRESH, BTN_EXPORT, BTN_DETAIL, BTN_SUBMIT } from "@/libs/constants/button.constant";
import { contactTypeOptions } from "@/libs/constants/options.constant";

type TableRow = Record<string, unknown>;

export const useServiceHistory = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.serviceHistory);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<ServiceHistoryFormValues>(serviceHistoryInitialValues);
  const [searchQuery, setSearchQuery] = useState<ServiceHistorySearchForm>(initServiceHistorySearchForm);

  useEffect(() => {
    document.title = "Lịch sử chăm sóc — G7Auto";
  }, []);

  useEffect(() => {
    dispatch(getServiceHistory(searchQuery));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (selected && editId)
      setFormValues({
        customerId: selected.customerId ?? "",
        employeeId: selected.employeeId ?? "",
        contactType: selected.contactType
          ? (contactTypeOptions.find((o) => o.value === selected.contactType) ?? null)
          : null,
        serviceDate: selected.serviceDate ?? "",
        content: selected.content ?? "",
        result: selected.result ?? "",
        nextReminderDate: selected.nextReminderDate ?? "",
      });
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
    if (key === BTN_DETAIL) {
      setEditId(row.id as number);
      dispatch(getServiceHistoryById(row.id as number));
      setDrawerOpen(true);
    }
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (!editId) await dispatch(createServiceHistory(data as unknown as ServiceHistoryRequest));
    closeDrawer();
    dispatch(getServiceHistory(searchQuery));
  };

  const searchHandlers = {
    [BTN_REFRESH]: () => { setSearchQuery(initServiceHistorySearchForm); },
    [BTN_EXPORT]: async () => { await dispatch(exportServiceHistory()); },
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };

  const handlePageChange = (page: number) => {
    setSearchQuery((prev) => ({ ...prev, page }));
  };

  return {
    drawerOpen, editId, formValues, searchQuery,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers,
    setFormValues, handlePageChange,
  };
};
