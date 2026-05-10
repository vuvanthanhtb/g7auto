import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import {
  getQuotations,
  createQuotations,
  getQuotationsById,
  clearSelectedQuotations,
  sendQuotation,
  acceptQuotation,
  cancelQuotation,
} from "../shell/quotations.slice";
import { quotationsService } from "../shell/quotations.service";
import type { QuotationRequest, QuotationSearchForm } from "../shell/quotations.type";
import { quotationsInitialValues, initQuotationSearchForm } from "./quotations.config";
import { BTN_SEARCH, BTN_REFRESH, BTN_EXPORT, BTN_DETAIL, BTN_SUBMIT, BTN_SEND, BTN_ACCEPT, BTN_CANCEL } from "@/libs/constants/button.constant";

type TableRow = Record<string, unknown>;

export const useQuotations = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.quotations);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(quotationsInitialValues);
  const [searchQuery, setSearchQuery] = useState<QuotationSearchForm>(initQuotationSearchForm);

  useEffect(() => {
    document.title = "Báo giá — G7Auto";
  }, []);

  useEffect(() => {
    dispatch(getQuotations(searchQuery));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (selected && editId) setFormValues(selected as unknown as Record<string, unknown>);
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setFormValues(quotationsInitialValues);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    dispatch(clearSelectedQuotations());
  };

  const handleCellAction = (row: TableRow, key?: string) => {
    if (key === BTN_DETAIL) {
      setEditId(row.id as number);
      dispatch(getQuotationsById(row.id as number));
      setDrawerOpen(true);
    }
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (!editId) await dispatch(createQuotations(data as unknown as QuotationRequest));
    closeDrawer();
    dispatch(getQuotations(searchQuery));
  };

  const handleSend = async () => {
    if (!editId) return;
    await dispatch(sendQuotation(editId));
    closeDrawer();
    dispatch(getQuotations(searchQuery));
  };

  const handleAccept = async () => {
    if (!editId) return;
    await dispatch(acceptQuotation(editId));
    closeDrawer();
    dispatch(getQuotations(searchQuery));
  };

  const handleCancel = async () => {
    if (!editId) return;
    await dispatch(cancelQuotation(editId));
    closeDrawer();
    dispatch(getQuotations(searchQuery));
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: QuotationSearchForm) => {
      setSearchQuery({ ...values, page: 1 });
    },
    [BTN_REFRESH]: () => {
      setSearchQuery(initQuotationSearchForm);
    },
    [BTN_EXPORT]: async () => { await quotationsService.exportExcel(); },
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };

  const detailHandlers = {
    [BTN_SEND]: handleSend,
    [BTN_ACCEPT]: handleAccept,
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
