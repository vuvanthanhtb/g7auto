import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import {
  getPayments,
  createPayments,
  getPaymentsById,
  clearSelectedPayments,
  confirmPayment,
  cancelPayment,
  exportPayments,
} from "../shell/payments.slice";
import { getAllContracts } from "@/modules/contracts/shell/contracts.slice";
import type { PaymentCreateFormValues, PaymentDetailFormValues, PaymentRequest, PaymentSearchForm } from "../shell/payments.type";
import { paymentsInitialValues, paymentDetailInitialValues, initPaymentSearchForm } from "./payments.config";
import { BTN_REFRESH, BTN_EXPORT, BTN_SEARCH, BTN_DETAIL, BTN_SUBMIT, BTN_CONFIRM, BTN_CANCEL } from "@/libs/constants/button.constant";

const generateTransactionCode = () => {
  const d = new Date();
  const date = d.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TXN-${date}-${rand}`;
};

type TableRow = Record<string, unknown>;

export const usePayments = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.payments);
  const contractAll = useAppSelector((s) => s.contracts.contractAll) ?? [];
  const contractOptions = contractAll.map((c) => ({
    label: `${c.contractNumber}`,
    value: c.id,
  }));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [createFormValues, setCreateFormValues] = useState<PaymentCreateFormValues>(paymentsInitialValues);
  const [detailFormValues, setDetailFormValues] = useState<PaymentDetailFormValues>(paymentDetailInitialValues);
  const [searchQuery, setSearchQuery] = useState<PaymentSearchForm>(initPaymentSearchForm);

  useEffect(() => {
    document.title = "Thanh toán — G7Auto";
    dispatch(getAllContracts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPayments(searchQuery));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (selected && editId) setDetailFormValues({ notes: selected.notes ?? "" });
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setCreateFormValues({ ...paymentsInitialValues, transactionCode: generateTransactionCode() });
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    dispatch(clearSelectedPayments());
  };

  const handleCellAction = (row: TableRow, key?: string) => {
    if (key === BTN_DETAIL) {
      setEditId(row.id as number);
      dispatch(getPaymentsById(row.id as number));
      setDrawerOpen(true);
    }
  };

  const toId = (v: unknown) => (v as { value?: number } | null)?.value;

  const handleSubmit = async (data: PaymentCreateFormValues) => {
    if (!editId) {
      const payload: PaymentRequest = {
        contractId: toId(data.contractId)!,
        amount: Number(data.amount),
        method: (data.method as { value: string }).value,
        paymentTime: data.paymentTime || undefined,
        collectorId: data.collectorId ? Number(data.collectorId) : undefined,
        transactionCode: data.transactionCode || undefined,
        notes: data.notes || undefined,
      };
      await dispatch(createPayments(payload));
    }
    closeDrawer();
    dispatch(getPayments(searchQuery));
  };

  const handleConfirm = async () => {
    if (!editId) return;
    await dispatch(confirmPayment(editId));
    closeDrawer();
    dispatch(getPayments(searchQuery));
  };

  const handleCancel = async () => {
    if (!editId) return;
    await dispatch(cancelPayment(editId));
    closeDrawer();
    dispatch(getPayments(searchQuery));
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: PaymentSearchForm) => {
      setSearchQuery({ ...values, page: 1 });
    },
    [BTN_REFRESH]: () => { setSearchQuery(initPaymentSearchForm); },
    [BTN_EXPORT]: async () => { await dispatch(exportPayments()); },
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit as (data: unknown) => Promise<void> };

  const detailHandlers = {
    [BTN_CONFIRM]: handleConfirm,
    [BTN_CANCEL]: handleCancel,
  };

  const handlePageChange = (page: number) => {
    setSearchQuery((prev) => ({ ...prev, page }));
  };

  return {
    drawerOpen, editId, createFormValues, detailFormValues, searchQuery,
    contractOptions,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers, detailHandlers,
    setCreateFormValues, setDetailFormValues, handlePageChange,
  };
};
