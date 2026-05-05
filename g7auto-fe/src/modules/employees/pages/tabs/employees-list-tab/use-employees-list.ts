import { useEffect, useState } from "react";
import { useAppDispatch } from "@/shell/redux/hooks";
import {
  getEmployees,
  resignEmployee,
} from "@/modules/employees/shell/employees.slice";
import { employeesService } from "@/modules/employees/services/employees.service";
import {
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_RESIGN,
} from "@/libs/constants/button.constant";
import { useConfirm } from "@/libs/components/ui/confirm-dialog";
import {
  employeeListInitialValues,
  employeeStatusOptions,
} from "./employees-list-tab.config";
import { parseEmployeeListFormSearch } from "./employees-list-tab.utils";
import type { EmployeeListSearchForm } from "./employees-list-tab.type";
import { getAllShowrooms } from "@/modules/showrooms/shell/showrooms.slice";

type TableRow = Record<string, unknown>;

export const useEmployeesList = () => {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const [searchParams, setSearchParams] = useState<EmployeeListSearchForm>(
    employeeListInitialValues,
  );

  useEffect(() => {
    dispatch(
      getEmployees(parseEmployeeListFormSearch(employeeListInitialValues)),
    );
    dispatch(getAllShowrooms());
  }, [dispatch]);

  const refresh = () => {
    setSearchParams(employeeListInitialValues);
    dispatch(
      getEmployees(parseEmployeeListFormSearch(employeeListInitialValues)),
    );
  };

  const handleCellAction = async (row: TableRow, key?: string) => {
    if (key === BTN_RESIGN) {
      const ok = await confirm(
        `Xác nhận cho nhân viên "${row.fullName}" nghỉ việc?`,
      );
      if (ok) {
        await dispatch(resignEmployee(row.id as number));
        dispatch(getEmployees(parseEmployeeListFormSearch(searchParams)));
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
    [BTN_REFRESH]: () => refresh(),
    [BTN_EXPORT]: async () => {
      await employeesService.export();
    },
  };

  const onchange = (values: EmployeeListSearchForm) => {
    setSearchParams(values);
  };

  return {
    searchParams,
    employeeStatusOptions,
    searchHandlers,
    handleCellAction,
    handlePageChange,
    onchange,
  };
};
