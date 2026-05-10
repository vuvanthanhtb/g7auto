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
} from "../shell/deposits.slice";
import { depositsService } from "../shell/deposits.service";
import type { DepositRequest, DepositSearchForm } from "../shell/deposits.type";
import { depositsInitialValues, initDepositSearchForm } from "./deposits.config";
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(depositsInitialValues);
  const [searchQuery, setSearchQuery] = useState<DepositSearchForm>(initDepositSearchForm);

  useEffect(() => {
    document.title = "Đặt cọc — G7Auto";
  }, []);

  useEffect(() => {
    dispatch(getDeposits(searchQuery));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (selected && editId) setFormValues(selected as unknown as Record<string, unknown>);
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setFormValues(depositsInitialValues);
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

  const handleSubmit = async (data: Record<string, unknown>) => {
    await dispatch(createDeposits(data as unknown as DepositRequest));
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
    [BTN_EXPORT]: async () => { await depositsService.exportExcel(); },
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };
  const detailHandlers = {
    [BTN_REFUND]: handleRefund,
    [BTN_CANCEL]: handleCancel,
    [BTN_CONVERT]: handleConvert,
  };

  const handlePageChange = (page: number) => {
    setSearchQuery((prev) => ({ ...prev, page }));
  };

  return {
    drawerOpen, editId, formValues, searchQuery,
    openCreate, closeDrawer, handleCellAction,
    searchHandlers, formHandlers, detailHandlers,
    setFormValues, handlePageChange,
  };
};
