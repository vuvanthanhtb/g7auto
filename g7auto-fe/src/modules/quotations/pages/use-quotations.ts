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
  exportQuotations,
} from "../shell/quotations.slice";
import type {
  QuotationCreateFormValues,
  QuotationDetailFormValues,
  QuotationRequest,
  QuotationSearchForm,
} from "../shell/quotations.type";
import {
  quotationsInitialValues,
  quotationDetailInitialValues,
  initQuotationSearchForm,
} from "./quotations.config";
import {
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_DETAIL,
  BTN_SUBMIT,
  BTN_SEND,
  BTN_ACCEPT,
  BTN_CANCEL,
} from "@/libs/constants/button.constant";
import { getAllCustomers } from "@/modules/customers/shell/customers.slice";
import { getAllCars } from "@/modules/cars/shell/cars.slice";
import { getAllEmployees } from "@/modules/employees/shell/employees.slice";

type TableRow = Record<string, unknown>;

const toId = (v: unknown): number | undefined =>
  (v as { value?: number } | null)?.value ?? undefined;

export const useQuotations = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.quotations);
  const customerAll = useAppSelector((s) => s.customers.customerAll) ?? [];
  const carAll = useAppSelector((s) => s.cars.carAll) ?? [];
  const employeeAll = useAppSelector((s) => s.employees.employeeAll) ?? [];
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [createFormValues, setCreateFormValues] =
    useState<QuotationCreateFormValues>(quotationsInitialValues);
  const [detailFormValues, setDetailFormValues] =
    useState<QuotationDetailFormValues>(quotationDetailInitialValues);
  const [searchQuery, setSearchQuery] = useState<QuotationSearchForm>(
    initQuotationSearchForm,
  );

  const customerOptions = customerAll.map((c) => ({
    label: c.fullName,
    value: c.id,
  }));
  const carOptions = carAll.map((c) => ({
    label: `${c.chassisNumber}${c.licensePlate ? ` — ${c.licensePlate}` : ""}`,
    value: c.id,
  }));
  const employeeOptions = employeeAll.map((e) => ({
    label: e.fullName,
    value: e.id,
  }));

  useEffect(() => {
    document.title = "Báo giá — G7Auto";
    if (drawerOpen) {
      dispatch(getAllCustomers());
      dispatch(getAllCars());
      dispatch(getAllEmployees());
    }
  }, [dispatch, drawerOpen]);

  useEffect(() => {
    dispatch(getQuotations(searchQuery));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (selected && editId)
      setDetailFormValues({ notes: selected.notes ?? "" });
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setCreateFormValues(quotationsInitialValues);
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
    if (!editId) {
      const payload: QuotationRequest = {
        customerId: toId(data.customerId)!,
        carId: toId(data.carId)!,
        employeeId: toId(data.employeeId),
        carPrice: data.carPrice as number,
        accessories: data.accessories as number,
        promotion: data.promotion as number,
        otherCosts: data.otherCosts as number,
        notes: data.notes as string,
      };
      await dispatch(createQuotations(payload));
    }
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
    [BTN_EXPORT]: async () => {
      await dispatch(exportQuotations());
    },
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
    drawerOpen,
    editId,
    createFormValues,
    detailFormValues,
    searchQuery,
    customerOptions,
    carOptions,
    employeeOptions,
    openCreate,
    closeDrawer,
    handleCellAction,
    searchHandlers,
    formHandlers,
    detailHandlers,
    setCreateFormValues,
    setDetailFormValues,
    handlePageChange,
  };
};
