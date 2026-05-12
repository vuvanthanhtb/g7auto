import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import {
  getEmployees,
  resignEmployee,
  createEmployeeApproving,
  updateEmployeeApproving,
  exportEmployees,
} from "@/modules/employees/shell/employees.slice";
import {
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_RESIGN,
  BTN_EDIT,
  BTN_SUBMIT,
} from "@/libs/constants/button.constant";
import { useConfirm } from "@/libs/components/ui/confirm-dialog";
import {
  employeeListInitialValues,
  employeeStatusOptions,
} from "./employees-list-tab.config";
import { parseEmployeeListFormSearch } from "./employees-list-tab.utils";
import type { EmployeeListSearchForm } from "./employees-list-tab.type";
import { getAllShowrooms } from "@/modules/showrooms/shell/showrooms.slice";
import {
  employeeInitialValues,
  type EmployeeFormValues,
} from "../../employees.config";
import type { EmployeeRequest } from "@/modules/employees/shell/employees.type";
import { genderOptions } from "@/libs/constants/options.constant";

type TableRow = Record<string, unknown>;

export const useEmployeesList = () => {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const [searchParams, setSearchParams] = useState<EmployeeListSearchForm>(
    employeeListInitialValues,
  );

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<EmployeeFormValues>(
    employeeInitialValues,
  );

  const showroomAll = useAppSelector((s) => s.showrooms.showroomAll) || [];
  const showroomOptions = showroomAll.map((s) => ({
    label: s.name,
    value: s.id,
  }));

  useEffect(() => {
    dispatch(
      getEmployees(parseEmployeeListFormSearch(employeeListInitialValues)),
    );
    dispatch(getAllShowrooms());
  }, [dispatch]);

  const refresh = (params = searchParams) => {
    dispatch(getEmployees(parseEmployeeListFormSearch(params)));
  };

  const openCreate = () => {
    setEditId(null);
    setFormValues(employeeInitialValues);
    setDrawerOpen(true);
  };

  const openEdit = (row: TableRow) => {
    setEditId(row.id as number);
    setFormValues({
      fullName: String(row.fullName ?? ""),
      phone: String(row.phone ?? ""),
      email: String(row.email ?? ""),
      nationalId: String(row.nationalId ?? ""),
      address: String(row.address ?? ""),
      birthDate: String(row.birthDate ?? ""),
      gender: row.gender
        ? (genderOptions.find((o) => o.value === row.gender) ?? null)
        : null,
      joinDate: String(row.joinDate ?? ""),
      showroom: row.showroomId
        ? {
            label: String(row.showroomName ?? ""),
            value: row.showroomId as number,
          }
        : null,
    });
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditId(null);
  };

  const handleSubmit = async (data: EmployeeFormValues) => {
    const payload: EmployeeRequest = {
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      nationalId: data.nationalId,
      address: data.address,
      birthDate: data.birthDate,
      gender: data.gender?.value as string,
      joinDate: data.joinDate,
      showroomId: data.showroom?.value as number,
    };
    let result;
    if (editId) {
      result = await dispatch(
        updateEmployeeApproving({ id: editId, data: payload }),
      );
    } else {
      result = await dispatch(createEmployeeApproving(payload));
    }
    if (result.meta.requestStatus === "fulfilled") {
      closeDrawer();
    }
  };

  const handleCellAction = async (row: TableRow, key?: string) => {
    if (key === BTN_EDIT) {
      openEdit(row);
    }
    if (key === BTN_RESIGN) {
      const ok = await confirm(
        `Xác nhận cho nhân viên "${row.fullName}" nghỉ việc?`,
      );
      if (ok) {
        await dispatch(resignEmployee(row.id as number));
        refresh();
      }
    }
  };

  const handlePageChange = (page: number) => {
    const updated = { ...searchParams, page };
    setSearchParams(updated);
    dispatch(getEmployees(parseEmployeeListFormSearch(updated)));
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: EmployeeListSearchForm) => {
      setSearchParams(values);
      dispatch(
        getEmployees(parseEmployeeListFormSearch({ ...values, page: 1 })),
      );
    },
    [BTN_REFRESH]: () => {
      setSearchParams(employeeListInitialValues);
      refresh(employeeListInitialValues);
    },
    [BTN_EXPORT]: async () => {
      await dispatch(exportEmployees());
    },
  };

  const formHandlers = {
    [BTN_SUBMIT]: handleSubmit as (data: unknown) => Promise<void>,
  };

  const onchange = (values: EmployeeListSearchForm) => {
    setSearchParams(values);
  };

  return {
    searchParams,
    employeeStatusOptions,
    drawerOpen,
    editId,
    formValues,
    showroomOptions,
    searchHandlers,
    formHandlers,
    handleCellAction,
    handlePageChange,
    openCreate,
    closeDrawer,
    setFormValues,
    onchange,
  };
};
