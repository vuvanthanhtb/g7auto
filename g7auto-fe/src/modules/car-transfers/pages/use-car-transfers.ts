import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import {
  getCarTransfers,
  getCarTransfersById,
  createCarTransfers,
  confirmExportTransfer,
  confirmReceiveTransfer,
  cancelTransfer,
  clearSelectedCarTransfers,
  exportCarTransfers,
} from "@/modules/car-transfers/shell/car-transfers.slice";
import { useConfirm } from "@/libs/components/ui/confirm-dialog";
import type { CarTransferRequest } from "@/modules/car-transfers/shell/car-transfers.type";
import { BTN_SEARCH, BTN_REFRESH, BTN_EXPORT, BTN_DETAIL, BTN_SUBMIT } from "@/libs/constants/button.constant";
import { searchInitialValues, createInitialValues } from "./car-transfers.config";
import { parseFormSearch } from "./car-transfers.utils";
import type { CarTransferSearchForm } from "./car-transfers.type";

type TableRow = Record<string, unknown>;

export const useCarTransfers = () => {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const { selected } = useAppSelector((s) => s.carTransfers);
  const [searchParams, setSearchParams] = useState<CarTransferSearchForm>(searchInitialValues);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailId, setDetailId] = useState<number | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [createValues, setCreateValues] = useState<Record<string, unknown>>(createInitialValues);

  useEffect(() => {
    dispatch(getCarTransfers(parseFormSearch(searchInitialValues)));
  }, [dispatch]);

  const refresh = (params = searchParams) => {
    dispatch(getCarTransfers(parseFormSearch(params)));
  };

  const handlePageChange = (page: number) => {
    const updated = { ...searchParams, page };
    setSearchParams(updated);
    dispatch(getCarTransfers(parseFormSearch(updated)));
  };

  const handleCellAction = (row: TableRow, key?: string) => {
    if (key === BTN_DETAIL) {
      setDetailId(row.id as number);
      dispatch(getCarTransfersById(row.id as number));
      setDrawerOpen(true);
    }
  };

  const closeDetail = () => {
    setDrawerOpen(false);
    setDetailId(null);
    dispatch(clearSelectedCarTransfers());
  };

  const handleConfirmExport = async () => {
    if (!detailId) return;
    const ok = await confirm("Xác nhận xuất kho phiếu điều chuyển này?");
    if (ok) {
      await dispatch(confirmExportTransfer(detailId));
      refresh();
    }
  };

  const handleConfirmReceive = async () => {
    if (!detailId) return;
    const ok = await confirm("Xác nhận nhận xe cho phiếu điều chuyển này?");
    if (ok) {
      await dispatch(confirmReceiveTransfer(detailId));
      refresh();
    }
  };

  const handleCancel = async () => {
    if (!detailId) return;
    const ok = await confirm("Hủy phiếu điều chuyển này?");
    if (ok) {
      await dispatch(cancelTransfer(detailId));
      refresh();
    }
  };

  const handleCreate = async (data: Record<string, unknown>) => {
    await dispatch(createCarTransfers(data as unknown as CarTransferRequest));
    setCreateOpen(false);
    refresh();
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: CarTransferSearchForm) => {
      setSearchParams(values);
      dispatch(getCarTransfers(parseFormSearch({ ...values, page: 1 })));
    },
    [BTN_REFRESH]: () => {
      setSearchParams(searchInitialValues);
      refresh(searchInitialValues);
    },
    [BTN_EXPORT]: async () => { await dispatch(exportCarTransfers()); },
  };

  const createHandlers = { [BTN_SUBMIT]: handleCreate };

  return {
    searchParams, drawerOpen, detailId, selected, createOpen,
    createValues, searchHandlers, createHandlers,
    handlePageChange, handleCellAction, closeDetail,
    handleConfirmExport, handleConfirmReceive, handleCancel,
    setCreateOpen, setCreateValues, onchange: setSearchParams,
  };
};
