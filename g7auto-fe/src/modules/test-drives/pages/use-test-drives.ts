import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import { getTestDrives, createTestDrives, getTestDrivesById, clearSelectedTestDrives } from "../shell/test-drives.slice";
import { testDrivesService } from "../shell/test-drives.service";
import type { TestDriveRequest } from "../shell/test-drives.type";
import { testDrivesInitialValues } from "./test-drives.config";
import { BTN_SEARCH, BTN_REFRESH, BTN_EXPORT, BTN_DETAIL, BTN_SUBMIT } from "@/libs/constants/button.constant";
import { normalizeFormValues } from "@/libs/utils";

type TableRow = Record<string, unknown>;

export const useTestDrives = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.testDrives);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(testDrivesInitialValues);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<Record<string, unknown>>({});

  useEffect(() => {
    document.title = "Lái thử — G7Auto";
    dispatch(getTestDrives({ page, size: 10, ...searchParams }));
  }, [dispatch, page, searchParams]);

  useEffect(() => {
    if (selected && editId) setFormValues(selected as unknown as Record<string, unknown>);
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setFormValues(testDrivesInitialValues);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    dispatch(clearSelectedTestDrives());
  };

  const handleCellAction = (row: TableRow, key?: string) => {
    if (key === BTN_DETAIL) {
      setEditId(row.id as number);
      dispatch(getTestDrivesById(row.id as number));
      setDrawerOpen(true);
    }
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (!editId) await dispatch(createTestDrives(data as unknown as TestDriveRequest));
    closeDrawer();
    dispatch(getTestDrives({ page, size: 10, ...searchParams }));
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: Record<string, unknown>) => { setSearchParams(normalizeFormValues(values)); setPage(1); },
    [BTN_REFRESH]: () => { dispatch(getTestDrives({ page, size: 10, ...searchParams })); },
    [BTN_EXPORT]: async () => { await testDrivesService.exportExcel(); },
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };

  return {
    drawerOpen, editId, formValues, page,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers,
    setFormValues, setPage,
  };
};
