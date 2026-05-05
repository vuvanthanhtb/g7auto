import BaseFormComponent from "@/libs/components/ui/base-form";
import BaseTableComponent from "@/libs/components/ui/base-table";
import { employeeListSearchConfig, employeeListColumns } from "./employees-list-tab.config";
import { useEmployeesList } from "./use-employees-list";
import type { EmployeeListSearchForm } from "./employees-list-tab.type";

const EmployeesListTab = () => {
  const { searchParams, employeeStatusOptions, searchHandlers, handleCellAction, handlePageChange, onchange } =
    useEmployeesList();

  return (
    <>
      <BaseFormComponent<EmployeeListSearchForm>
        formConfig={employeeListSearchConfig}
        options={{ employeeStatusOptions }}
        handlers={searchHandlers}
        values={searchParams}
        onChange={onchange}
      />
      <BaseTableComponent
        tableConfig={employeeListColumns}
        reducer="employees"
        state="employeeTable"
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default EmployeesListTab;
