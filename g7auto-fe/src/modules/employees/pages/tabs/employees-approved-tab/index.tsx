import { useEffect, useState } from "react";
import BaseFormComponent from "@/libs/components/ui/base-form";
import BaseTableComponent from "@/libs/components/ui/base-table";
import { BTN_SEARCH, BTN_REFRESH } from "@/libs/constants/button.constant";
import { useAppDispatch } from "@/shell/redux/hooks";
import { getApprovedApprovals } from "@/modules/employees/shell/employees.slice";
import {
  getEmployeeApprovedColumns,
  getEmployeeApprovedSearchConfig,
  approvedInitialValues,
} from "./employees-approved-tab.config";
import { parseApprovedFormSearch } from "./employees-approved-tab.utils";
import type { EmployeeApprovedSearchForm } from "./employees-approved-tab.type";

const EmployeesApprovedTab = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useState<EmployeeApprovedSearchForm>(
    approvedInitialValues,
  );

  useEffect(() => {
    dispatch(getApprovedApprovals(parseApprovedFormSearch(approvedInitialValues)));
  }, [dispatch]);

  const refresh = () => {
    setSearchParams(approvedInitialValues);
    dispatch(getApprovedApprovals(parseApprovedFormSearch(approvedInitialValues)));
  };

  const handlePageChange = (page: number) => {
    const updated = { ...searchParams, page };
    setSearchParams(updated);
    dispatch(getApprovedApprovals(parseApprovedFormSearch(updated)));
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: EmployeeApprovedSearchForm) => {
      setSearchParams(values);
      dispatch(getApprovedApprovals(parseApprovedFormSearch({ ...values, page: 1 })));
    },
    [BTN_REFRESH]: () => refresh(),
  };

  const onchange = (values: EmployeeApprovedSearchForm) => {
    setSearchParams(values);
  };

  return (
    <>
      <BaseFormComponent<EmployeeApprovedSearchForm>
        formConfig={getEmployeeApprovedSearchConfig()}
        handlers={searchHandlers}
        values={searchParams}
        onChange={onchange}
      />
      <BaseTableComponent
        tableConfig={getEmployeeApprovedColumns()}
        reducer="employees"
        state="approvedTable"
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default EmployeesApprovedTab;
