import BaseFormComponent from "@/libs/components/ui/base-form";
import BaseTableComponent from "@/libs/components/ui/base-table";
import { getEmployeeListSearchConfig, getEmployeeListColumns } from "./employees-list-tab.config";
import { useEmployeesList } from "./use-employees-list";
import type { EmployeeListSearchForm } from "./employees-list-tab.type";

const EmployeesListTab = () => {
  const { searchParams, employeeStatusOptions, searchHandlers, handleCellAction, handlePageChange, onchange } =
    useEmployeesList();

  return (
    <>
      <BaseFormComponent<EmployeeListSearchForm>
        formConfig={getEmployeeListSearchConfig()}
        options={{ employeeStatusOptions }}
        handlers={searchHandlers}
        values={searchParams}
        onChange={onchange}
      />
      <BaseTableComponent
        tableConfig={getEmployeeListColumns()}
        reducer="employees"
        state="employeeTable"
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default EmployeesListTab;
