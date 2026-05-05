import { useEffect, useState } from "react";
import BaseFormComponent from "@/libs/components/ui/base-form";
import BaseTableComponent from "@/libs/components/ui/base-table";
import { useConfirm } from "@/libs/components/ui/confirm-dialog";
import { BTN_APPROVE, BTN_REJECT, BTN_SEARCH, BTN_REFRESH } from "@/libs/constants/button.constant";
import { useAppDispatch } from "@/shell/redux/hooks";
import {
  getPendingApprovals,
  approveEmployeeApproving,
} from "@/modules/employees/shell/employees.slice";
import {
  employeePendingColumns,
  employeePendingSearchConfig,
  pendingInitialValues,
} from "./employees-pending-tab.config";
import { parsePendingFormSearch } from "./employees-pending-tab.utils";
import type { EmployeePendingSearchForm } from "./employees-pending-tab.type";

type TableRow = Record<string, unknown>;

const EmployeesPendingTab = () => {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const [searchParams, setSearchParams] = useState<EmployeePendingSearchForm>(pendingInitialValues);

  useEffect(() => {
    dispatch(getPendingApprovals(parsePendingFormSearch(pendingInitialValues)));
  }, [dispatch]);

  const refresh = () => {
    setSearchParams(pendingInitialValues);
    dispatch(getPendingApprovals(parsePendingFormSearch(pendingInitialValues)));
  };

  const handleCellAction = async (row: TableRow, key?: string) => {
    if (key === BTN_APPROVE) {
      const ok = await confirm(`Duyệt yêu cầu nhân viên "${row.fullName}"?`);
      if (ok) {
        await dispatch(approveEmployeeApproving(row.id as number));
        dispatch(getPendingApprovals(parsePendingFormSearch(searchParams)));
      }
    }
    if (key === BTN_REJECT) {
      const ok = await confirm(`Từ chối yêu cầu nhân viên "${row.fullName}"?`);
      if (ok) {
        // TODO: implement reject endpoint when backend provides it
        dispatch(getPendingApprovals(parsePendingFormSearch(searchParams)));
      }
    }
  };

  const handlePageChange = (page: number) => {
    const updated = { ...searchParams, page };
    setSearchParams(updated);
    dispatch(getPendingApprovals(parsePendingFormSearch(updated)));
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: EmployeePendingSearchForm) => {
      setSearchParams(values);
      dispatch(getPendingApprovals(parsePendingFormSearch({ ...values, page: 1 })));
    },
    [BTN_REFRESH]: () => refresh(),
  };

  const onchange = (values: EmployeePendingSearchForm) => {
    setSearchParams(values);
  };

  return (
    <>
      <BaseFormComponent<EmployeePendingSearchForm>
        formConfig={employeePendingSearchConfig}
        handlers={searchHandlers}
        values={searchParams}
        onChange={onchange}
      />
      <BaseTableComponent
        tableConfig={employeePendingColumns}
        reducer="employees"
        state="pendingTable"
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default EmployeesPendingTab;
