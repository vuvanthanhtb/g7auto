import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import {
  getPayments,
  createPayments,
  getPaymentsById,
  clearSelectedPayments,
  confirmPayment,
  cancelPayment,
} from "../shell/payments.slice";
import { paymentsService } from "../shell/payments.service";
import type { PaymentRequest, PaymentSearchForm } from "../shell/payments.type";
import { paymentsInitialValues, initPaymentSearchForm } from "./payments.config";
import { BTN_REFRESH, BTN_EXPORT, BTN_SEARCH, BTN_DETAIL, BTN_SUBMIT, BTN_CONFIRM, BTN_CANCEL } from "@/libs/constants/button.constant";

type TableRow = Record<string, unknown>;

export const usePayments = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.payments);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(paymentsInitialValues);
  const [searchQuery, setSearchQuery] = useState<PaymentSearchForm>(initPaymentSearchForm);

  useEffect(() => {
    document.title = "Thanh toán — G7Auto";
  }, []);

  useEffect(() => {
    dispatch(getPayments(searchQuery));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (selected && editId) setFormValues(selected as unknown as Record<string, unknown>);
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setFormValues(paymentsInitialValues);
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

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (!editId) await dispatch(createPayments(data as unknown as PaymentRequest));
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
    [BTN_EXPORT]: async () => { await paymentsService.exportExcel(); },
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };

  const detailHandlers = {
    [BTN_CONFIRM]: handleConfirm,
    [BTN_CANCEL]: handleCancel,
  };

  const handlePageChange = (page: number) => {
    setSearchQuery((prev) => ({ ...prev, page }));
  };

  return {
    drawerOpen, editId, formValues, searchQuery,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers, detailHandlers,
    setFormValues, handlePageChange,
  };
};
