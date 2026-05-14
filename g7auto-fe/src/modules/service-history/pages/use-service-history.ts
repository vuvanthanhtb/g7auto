import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import {
  getServiceHistory,
  createServiceHistory,
  getServiceHistoryById,
  clearSelectedServiceHistory,
  exportServiceHistory,
} from "../shell/service-history.slice";
import { getAllCustomers } from "@/modules/customers/shell/customers.slice";
import { getAllEmployees } from "@/modules/employees/shell/employees.slice";
import type {
  ServiceHistoryFormValues,
  ServiceHistoryRequest,
  ServiceHistorySearchForm,
} from "../shell/service-history.type";
import {
  serviceHistoryInitialValues,
  initServiceHistorySearchForm,
} from "./service-history.config";
import {
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_DETAIL,
  BTN_SUBMIT,
} from "@/libs/constants/button.constant";

type TableRow = Record<string, unknown>;

const toId = (v: unknown) => (v as { value?: number } | null)?.value;

export const useServiceHistory = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.serviceHistory);
  const customerAll = useAppSelector((s) => s.customers.customerAll) ?? [];
  const employeeAll = useAppSelector((s) => s.employees.employeeAll) ?? [];

  const customerOptions = customerAll.map((c) => ({ label: c.fullName, value: c.id }));
  const employeeOptions = employeeAll.map((e) => ({ label: e.fullName, value: e.id }));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailId, setDetailId] = useState<number | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [formValues, setFormValues] = useState<ServiceHistoryFormValues>(serviceHistoryInitialValues);
  const [searchQuery, setSearchQuery] = useState<ServiceHistorySearchForm>(initServiceHistorySearchForm);

  useEffect(() => {
    document.title = "Lịch sử chăm sóc — G7Auto";
    dispatch(getAllCustomers());
    dispatch(getAllEmployees());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getServiceHistory(searchQuery));
  }, [dispatch, searchQuery]);

  const openCreate = () => {
    setFormValues(serviceHistoryInitialValues);
    setCreateOpen(true);
  };

  const closeCreate = () => {
    setCreateOpen(false);
  };

  const openDetail = (id: number) => {
    setDetailId(id);
    dispatch(getServiceHistoryById(id));
    setDrawerOpen(true);
  };

  const closeDetail = () => {
    setDrawerOpen(false);
    setDetailId(null);
    dispatch(clearSelectedServiceHistory());
  };

  const handleCellAction = (row: TableRow, key?: string) => {
    if (key === BTN_DETAIL) openDetail(row.id as number);
  };

  const handleSubmit = async (data: ServiceHistoryFormValues) => {
    const body: ServiceHistoryRequest = {
      customerId: toId(data.customerId)!,
      employeeId: toId(data.employeeId),
      contactType: (data.contactType as { value: string }).value,
      serviceDate: data.serviceDate,
      content: data.content || undefined,
      result: data.result || undefined,
      nextReminderDate: data.nextReminderDate || undefined,
    };
    await dispatch(createServiceHistory(body));
    closeCreate();
    dispatch(getServiceHistory(searchQuery));
  };

  const searchHandlers = {
    [BTN_REFRESH]: () => { setSearchQuery(initServiceHistorySearchForm); },
    [BTN_EXPORT]: async () => { await dispatch(exportServiceHistory()); },
  };

  const formHandlers = {
    [BTN_SUBMIT]: handleSubmit as (data: unknown) => Promise<void>,
  };

  const handlePageChange = (page: number) => {
    setSearchQuery((prev) => ({ ...prev, page }));
  };

  return {
    drawerOpen,
    detailId,
    createOpen,
    selected,
    formValues,
    searchQuery,
    customerOptions,
    employeeOptions,
    openCreate,
    closeCreate,
    closeDetail,
    handleCellAction,
    searchHandlers,
    formHandlers,
    setFormValues,
    handlePageChange,
  };
};
