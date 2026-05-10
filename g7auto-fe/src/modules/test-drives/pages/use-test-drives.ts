import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import {
  getTestDrives,
  createTestDrives,
  getTestDrivesById,
  clearSelectedTestDrives,
  confirmTestDrive,
  completeTestDrive,
  cancelTestDrive,
} from "../shell/test-drives.slice";
import { testDrivesService } from "../shell/test-drives.service";
import type { TestDriveRequest, TestDriveSearchForm } from "../shell/test-drives.type";
import { testDrivesInitialValues, initTestDriveSearchForm } from "./test-drives.config";
import { BTN_SEARCH, BTN_REFRESH, BTN_EXPORT, BTN_DETAIL, BTN_SUBMIT, BTN_CONFIRM, BTN_COMPLETE, BTN_CANCEL } from "@/libs/constants/button.constant";

type TableRow = Record<string, unknown>;

export const useTestDrives = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.testDrives);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(testDrivesInitialValues);
  const [searchQuery, setSearchQuery] = useState<TestDriveSearchForm>(initTestDriveSearchForm);

  useEffect(() => {
    document.title = "Lái thử — G7Auto";
  }, []);

  useEffect(() => {
    dispatch(getTestDrives(searchQuery));
  }, [dispatch, searchQuery]);

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
    dispatch(getTestDrives(searchQuery));
  };

  const handleConfirm = async () => {
    if (!editId) return;
    await dispatch(confirmTestDrive(editId));
    closeDrawer();
    dispatch(getTestDrives(searchQuery));
  };

  const handleComplete = async (data: Record<string, unknown>) => {
    if (!editId) return;
    await dispatch(completeTestDrive({ id: editId, notes: data.notes as string | undefined }));
    closeDrawer();
    dispatch(getTestDrives(searchQuery));
  };

  const handleCancel = async () => {
    if (!editId) return;
    await dispatch(cancelTestDrive(editId));
    closeDrawer();
    dispatch(getTestDrives(searchQuery));
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: TestDriveSearchForm) => {
      setSearchQuery({ ...values, page: 1 });
    },
    [BTN_REFRESH]: () => {
      setSearchQuery(initTestDriveSearchForm);
    },
    [BTN_EXPORT]: async () => { await testDrivesService.exportExcel(); },
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };

  const detailHandlers = {
    [BTN_CONFIRM]: handleConfirm,
    [BTN_COMPLETE]: handleComplete,
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
