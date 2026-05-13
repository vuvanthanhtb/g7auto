import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import {
  getDeposits,
  createDeposits,
  refundDeposit,
  cancelDeposit,
  convertDepositToContract,
  getDepositsById,
  clearSelectedDeposits,
  exportDeposits,
} from "../shell/deposits.slice";
import { getAllCustomers } from "@/modules/customers/shell/customers.slice";
import { getAllCars } from "@/modules/cars/shell/cars.slice";
import { getAllEmployees } from "@/modules/employees/shell/employees.slice";
import { getAllQuotations } from "@/modules/quotations/shell/quotations.slice";
import type { DepositCreateFormValues, DepositDetailFormValues, DepositRequest, DepositSearchForm } from "../shell/deposits.type";
import { depositsInitialValues, depositDetailInitialValues, initDepositSearchForm } from "./deposits.config";
import {
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_DETAIL,
  BTN_SUBMIT,
  BTN_REFUND,
  BTN_CANCEL,
  BTN_CONVERT,
} from "@/libs/constants/button.constant";

type TableRow = Record<string, unknown>;

export const useDeposits = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.deposits);
  const customerAll = useAppSelector((s) => s.customers.customerAll) ?? [];
  const carAll = useAppSelector((s) => s.cars.carAll) ?? [];
  const employeeAll = useAppSelector((s) => s.employees.employeeAll) ?? [];
  const quotationAll = useAppSelector((s) => s.quotations.quotationAll) ?? [];
  const customerOptions = customerAll.map((c) => ({ label: c.fullName, value: c.id }));
  const carOptions = carAll.map((c) => ({
    label: `${c.chassisNumber}${c.licensePlate ? ` — ${c.licensePlate}` : ""}`,
    value: c.id,
  }));
  const employeeOptions = employeeAll.map((e) => ({ label: e.fullName, value: e.id }));
  const quotationOptions = quotationAll.map((q) => ({
    label: `#${q.id} — ${q.customerFullName} — ${q.carChassisNumber}`,
    value: q.id,
  }));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [createFormValues, setCreateFormValues] = useState<DepositCreateFormValues>(depositsInitialValues);
  const [detailFormValues, setDetailFormValues] = useState<DepositDetailFormValues>(depositDetailInitialValues);
  const [searchQuery, setSearchQuery] = useState<DepositSearchForm>(initDepositSearchForm);

  useEffect(() => {
    document.title = "Đặt cọc — G7Auto";
    dispatch(getAllCustomers());
    dispatch(getAllCars());
    dispatch(getAllEmployees());
    dispatch(getAllQuotations());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDeposits(searchQuery));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (selected && editId) setDetailFormValues({ notes: selected.notes ?? "" });
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setCreateFormValues(depositsInitialValues);
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

  const toId = (v: unknown) => (v as { value?: number } | null)?.value;

  const handleSubmit = async (data: DepositCreateFormValues) => {
    const payload: DepositRequest = {
      customerId: toId(data.customerId)!,
      carId: toId(data.carId)!,
      employeeId: toId(data.employeeId),
      quotationId: toId(data.quotationId),
      amount: Number(data.amount),
      depositDate: data.depositDate,
      expiryDate: data.expiryDate || undefined,
      depositPaymentMethod: (data.depositPaymentMethod as { value: string }).value,
      notes: data.notes || undefined,
    };
    await dispatch(createDeposits(payload));
    closeDrawer();
    dispatch(getDeposits(searchQuery));
  };

  const handleRefund = async (data: Record<string, unknown>) => {
    if (editId) {
      await dispatch(refundDeposit({ id: editId, notes: data.notes as string | undefined }));
      closeDrawer();
      dispatch(getDeposits(searchQuery));
    }
  };

  const handleCancel = async () => {
    if (editId) {
      await dispatch(cancelDeposit(editId));
      closeDrawer();
      dispatch(getDeposits(searchQuery));
    }
  };

  const handleConvert = async (data: Record<string, unknown>) => {
    if (editId) {
      await dispatch(convertDepositToContract({ id: editId, notes: data.notes as string | undefined }));
      closeDrawer();
      dispatch(getDeposits(searchQuery));
    }
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: DepositSearchForm) => {
      setSearchQuery({ ...values, page: 1 });
    },
    [BTN_REFRESH]: () => {
      setSearchQuery(initDepositSearchForm);
    },
    [BTN_EXPORT]: async () => { await dispatch(exportDeposits()); },
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit as (data: unknown) => Promise<void> };
  const detailHandlers = {
    [BTN_REFUND]: handleRefund,
    [BTN_CANCEL]: handleCancel,
    [BTN_CONVERT]: handleConvert,
  };

  const handlePageChange = (page: number) => {
    setSearchQuery((prev) => ({ ...prev, page }));
  };

  return {
    drawerOpen, editId, createFormValues, detailFormValues, searchQuery,
    customerOptions, carOptions, employeeOptions, quotationOptions,
    openCreate, closeDrawer, handleCellAction,
    searchHandlers, formHandlers, detailHandlers,
    setCreateFormValues, setDetailFormValues, handlePageChange,
  };
};
