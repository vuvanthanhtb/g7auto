import { useState } from "react";
import { useAppDispatch } from "@/shell/redux/hooks";
import { createEmployeeApproving } from "../shell/employees.slice";
import type { EmployeeRequest } from "../shell/employees.type";
import { employeeInitialValues } from "./employees.config";
import { BTN_SUBMIT } from "@/libs/constants/button.constant";

export const useEmployees = () => {
  const dispatch = useAppDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(employeeInitialValues);

  const openCreate = () => {
    setFormValues(employeeInitialValues);
    setDrawerOpen(true);
  };

  const closeDrawer = () => setDrawerOpen(false);

  const handleSubmit = async (data: Record<string, unknown>) => {
    const result = await dispatch(
      createEmployeeApproving(data as unknown as EmployeeRequest),
    );
    if (!result.meta.requestStatus || result.meta.requestStatus === "fulfilled") {
      closeDrawer();
    }
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };

  return {
    drawerOpen,
    formValues,
    openCreate,
    closeDrawer,
    formHandlers,
    setFormValues,
  };
};
