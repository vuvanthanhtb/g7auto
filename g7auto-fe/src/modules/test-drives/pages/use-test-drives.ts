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
  exportTestDrives,
} from "../shell/test-drives.slice";
import { getAllCustomers } from "@/modules/customers/shell/customers.slice";
import { getAllCars } from "@/modules/cars/shell/cars.slice";
import { getAllShowrooms } from "@/modules/showrooms/shell/showrooms.slice";
import { getAllEmployees } from "@/modules/employees/shell/employees.slice";
import type {
  TestDriveCreateFormValues,
  TestDriveDetailFormValues,
  TestDriveRequest,
  TestDriveSearchForm,
} from "../shell/test-drives.type";
import {
  testDrivesInitialValues,
  testDriveDetailInitialValues,
  initTestDriveSearchForm,
} from "./test-drives.config";
import {
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_DETAIL,
  BTN_SUBMIT,
  BTN_CONFIRM,
  BTN_COMPLETE,
  BTN_CANCEL,
} from "@/libs/constants/button.constant";

type TableRow = Record<string, unknown>;

const toId = (v: unknown) => (v as { value?: number } | null)?.value;

export const useTestDrives = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.testDrives);
  const customerAll = useAppSelector((s) => s.customers.customerAll) ?? [];
  const carAll = useAppSelector((s) => s.cars.carAll) ?? [];
  const showroomAll = useAppSelector((s) => s.showrooms.showroomAll) ?? [];
  const employeeAll = useAppSelector((s) => s.employees.employeeAll) ?? [];

  const customerOptions = customerAll.map((c) => ({
    label: c.fullName,
    value: c.id,
  }));
  const carOptions = carAll.map((c) => ({
    label: `${c.chassisNumber}${c.licensePlate ? ` — ${c.licensePlate}` : ""}`,
    value: c.id,
  }));
  const showroomOptions = showroomAll.map((s) => ({
    label: s.name,
    value: s.id,
  }));
  const employeeOptions = employeeAll.map((e) => ({
    label: e.fullName,
    value: e.id,
  }));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [createFormValues, setCreateFormValues] =
    useState<TestDriveCreateFormValues>(testDrivesInitialValues);
  const [detailFormValues, setDetailFormValues] =
    useState<TestDriveDetailFormValues>(testDriveDetailInitialValues);
  const [searchQuery, setSearchQuery] = useState<TestDriveSearchForm>(
    initTestDriveSearchForm,
  );

  useEffect(() => {
    document.title = "Lái thử — G7Auto";
    dispatch(getAllCustomers());
    dispatch(getAllCars());
    dispatch(getAllShowrooms());
    dispatch(getAllEmployees());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTestDrives(searchQuery));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (selected && editId)
      setDetailFormValues({ notes: selected.notes ?? "" });
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setCreateFormValues(testDrivesInitialValues);
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

  const handleCreate = async (data: TestDriveCreateFormValues) => {
    if (!editId) {
      const body: TestDriveRequest = {
        customerId: toId(data.customerId)!,
        carId: toId(data.carId)!,
        employeeId: toId(data.employeeId),
        showroomId: toId(data.showroomId),
        startTime: data.startTime,
        endTime: data.endTime,
        notes: data.notes || undefined,
      };
      await dispatch(createTestDrives(body));
    }
    closeDrawer();
    dispatch(getTestDrives(searchQuery));
  };

  const handleConfirm = async () => {
    if (!editId) return;
    await dispatch(confirmTestDrive(editId));
    closeDrawer();
    dispatch(getTestDrives(searchQuery));
  };

  const handleComplete = async (data: TestDriveDetailFormValues) => {
    if (!editId) return;
    await dispatch(
      completeTestDrive({
        id: editId,
        notes: data.notes,
      }),
    );
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
    [BTN_EXPORT]: async () => {
      await dispatch(exportTestDrives());
    },
  };

  const createHandlers = {
    [BTN_SUBMIT]: handleCreate as (data: unknown) => Promise<void>,
  };

  const detailHandlers = {
    [BTN_CONFIRM]: handleConfirm,
    [BTN_COMPLETE]: handleComplete,
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
    showroomOptions,
    employeeOptions,
    openCreate,
    closeDrawer,
    handleCellAction,
    searchHandlers,
    createHandlers,
    detailHandlers,
    setCreateFormValues,
    setDetailFormValues,
    handlePageChange,
  };
};
