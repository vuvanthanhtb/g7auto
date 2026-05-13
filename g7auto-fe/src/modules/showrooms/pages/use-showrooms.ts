import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import {
  getShowrooms,
  createShowroom,
  updateShowroom,
  deleteShowroom,
  getShowroomById,
  clearSelectedShowroom,
  exportShowrooms,
} from "../shell/showrooms.slice";
import { getAllEmployees } from "@/modules/employees/shell/employees.slice";
import { parseShowroomExport } from "../shell/showrooms.utils";
import { useConfirm } from "@/libs/components/ui/confirm-dialog";
import type {
  ShowroomFormValues,
  ShowroomRequest,
  ShowroomSearchForm,
} from "../shell/showroom.type";
import {
  showroomInitialValues,
  initShowroomSearchForm,
} from "./showrooms.config";
import {
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_EDIT,
  BTN_DELETE,
  BTN_SUBMIT,
} from "@/libs/constants/button.constant";

type TableRow = Record<string, unknown>;

export const useShowrooms = () => {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const { selected } = useAppSelector((s) => s.showrooms);
  const employeeAll = useAppSelector((s) => s.employees.employeeAll);
  const employeeOptions = employeeAll.map((e) => ({
    label: e.fullName,
    value: e.id,
  }));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<ShowroomFormValues>(
    showroomInitialValues,
  );
  const [searchQuery, setSearchQuery] = useState<ShowroomSearchForm>(
    initShowroomSearchForm,
  );

  useEffect(() => {
    document.title = "Showroom — G7Auto";
    dispatch(getAllEmployees());
  }, []);

  useEffect(() => {
    dispatch(getShowrooms(searchQuery));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (selected && editId)
      setFormValues({
        name: selected.name ?? "",
        address: selected.address ?? "",
        phone: selected.phone ?? "",
        email: selected.email ?? "",
        managerId: selected.managerId
          ? { label: selected.managerName ?? "", value: selected.managerId }
          : null,
      });
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
      const ok = await confirm(`Bạn có chắc muốn xoá showroom "${row.name}"?`, {
        danger: true,
        confirmText: "Xoá",
      });
      if (ok) {
        await dispatch(deleteShowroom(row.id as number));
        dispatch(getShowrooms(searchQuery));
      }
    }
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    const managerId = (data.managerId as { value?: number } | null)?.value;
    const payload = {
      ...data,
      managerId: managerId ?? undefined,
    } as ShowroomRequest;
    if (editId)
      await dispatch(
        updateShowroom({
          id: editId,
          data: payload,
        }),
      );
    else await dispatch(createShowroom(payload));
    closeDrawer();
    dispatch(getShowrooms(searchQuery));
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: ShowroomSearchForm) => {
      setSearchQuery({ ...values, page: 1 });
    },
    [BTN_REFRESH]: () => {
      setSearchQuery(initShowroomSearchForm);
    },
    [BTN_EXPORT]: async () => { await dispatch(exportShowrooms(parseShowroomExport(searchQuery))); },
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };

  const handlePageChange = (page: number) => {
    setSearchQuery((prev) => ({ ...prev, page }));
  };

  return {
    drawerOpen,
    editId,
    formValues,
    searchQuery,
    employeeOptions,
    openCreate,
    closeDrawer,
    handleCellAction,
    searchHandlers,
    formHandlers,
    setFormValues,
    handlePageChange,
  };
};
