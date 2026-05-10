import { useState } from "react";
import { useAppDispatch } from "@/shell/redux/hooks";
import {
  createEmployeeApproving,
  updateEmployeeApproving,
} from "../shell/employees.slice";
import type { EmployeeRequest } from "../shell/employees.type";
import { employeeInitialValues } from "./employees.config";
import { BTN_SUBMIT } from "@/libs/constants/button.constant";

type TableRow = Record<string, unknown>;

export const useEmployees = () => {
  const dispatch = useAppDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(employeeInitialValues);

  const openCreate = () => {
    setEditId(null);
    setFormValues(employeeInitialValues);
    setDrawerOpen(true);
  };

  const openEdit = (row: TableRow) => {
    setEditId(row.id as number);
    setFormValues({
      fullName: row.fullName ?? "",
      phone: row.phone ?? "",
      email: row.email ?? "",
      nationalId: row.nationalId ?? "",
      address: row.address ?? "",
      birthDate: row.birthDate ?? "",
      gender: row.gender ?? "",
      joinDate: row.joinDate ?? "",
      showroom: row.showroomId
        ? { label: row.showroomName, value: row.showroomId }
        : null,
    });
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditId(null);
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    const showroom = data.showroom as { value: number } | null;
    const payload: EmployeeRequest = {
      ...(data as unknown as EmployeeRequest),
      showroomId: showroom?.value ?? (data.showroomId as number),
    };
    let result;
    if (editId) {
      result = await dispatch(updateEmployeeApproving({ id: editId, data: payload }));
    } else {
      result = await dispatch(createEmployeeApproving(payload));
    }
    if (result.meta.requestStatus === "fulfilled") {
      closeDrawer();
    }
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };

  return {
    drawerOpen,
    editId,
    formValues,
    openCreate,
    openEdit,
    closeDrawer,
    formHandlers,
    setFormValues,
  };
};
