import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import { getPayments, createPayments, getPaymentsById, clearSelectedPayments } from "../shell/payments.slice";
import { paymentsService } from "../shell/payments.service";
import type { PaymentRequest } from "../shell/payments.type";
import { paymentsInitialValues } from "./payments.config";
import { BTN_REFRESH, BTN_EXPORT, BTN_DETAIL, BTN_SUBMIT } from "@/libs/constants/button.constant";

type TableRow = Record<string, unknown>;

export const usePayments = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.payments);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(paymentsInitialValues);
  const [page, setPage] = useState(1);

  useEffect(() => {
    document.title = "Thanh toán — G7Auto";
    dispatch(getPayments({ page, size: 10 }));
  }, [dispatch, page]);

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
    dispatch(getPayments({ page, size: 10 }));
  };

  const searchHandlers = {
    [BTN_REFRESH]: () => { dispatch(getPayments({ page, size: 10 })); },
    [BTN_EXPORT]: async () => { await paymentsService.exportExcel(); },
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };

  return {
    drawerOpen, editId, formValues, page,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers,
    setFormValues, setPage,
  };
};
