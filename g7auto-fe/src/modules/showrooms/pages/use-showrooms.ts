import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import {
  getShowrooms,
  createShowroom,
  updateShowroom,
  deleteShowroom,
  getShowroomById,
  clearSelectedShowroom,
  getAllShowrooms,
} from "../shell/showrooms.slice";
import { showroomsService } from "../shell/showroom.service";
import { useConfirm } from "@/libs/components/ui/confirm-dialog";
import type { ShowroomRequest } from "../shell/showroom.type";
import { showroomInitialValues } from "./showrooms.config";
import {
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_EDIT,
  BTN_DELETE,
  BTN_SUBMIT,
} from "@/libs/constants/button.constant";
import { normalizeFormValues } from "@/libs/utils";

type TableRow = Record<string, unknown>;

export const useShowrooms = () => {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const { selected } = useAppSelector((s) => s.showrooms);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(
    showroomInitialValues,
  );
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<Record<string, unknown>>({});

  useEffect(() => {
    document.title = "Showroom — G7Auto";
    dispatch(getShowrooms({ page, size: 10, ...searchParams }));
  }, [dispatch, page, searchParams]);

  useEffect(() => {
    if (selected && editId)
      setFormValues(selected as unknown as Record<string, unknown>);
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setFormValues(showroomInitialValues);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    dispatch(clearSelectedShowroom());
  };

  const handleCellAction = async (row: TableRow, key?: string) => {
    if (key === BTN_EDIT) {
      setEditId(row.id as number);
      dispatch(getShowroomById(row.id as number));
      setDrawerOpen(true);
    }
    if (key === BTN_DELETE) {
      const ok = await confirm(`Xóa showroom "${row.name}"?`);
      if (ok) {
        await dispatch(deleteShowroom(row.id as number));
        dispatch(getShowrooms({ page, size: 10, ...searchParams }));
      }
    }
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (editId)
      await dispatch(
        updateShowroom({
          id: editId,
          data: data as unknown as ShowroomRequest,
        }),
      );
    else await dispatch(createShowroom(data as unknown as ShowroomRequest));
    closeDrawer();
    dispatch(getShowrooms({ page, size: 10, ...searchParams }));
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: Record<string, unknown>) => {
      setSearchParams(normalizeFormValues(values));
      setPage(1);
    },
    [BTN_REFRESH]: () => {
      dispatch(getShowrooms({ page, size: 10, ...searchParams }));
    },
    [BTN_EXPORT]: async () => {
      await showroomsService.exportExcel();
    },
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };

  return {
    drawerOpen,
    editId,
    formValues,
    page,
    openCreate,
    closeDrawer,
    handleCellAction,
    searchHandlers,
    formHandlers,
    setFormValues,
    setPage,
    getAllShowrooms,
  };
};
