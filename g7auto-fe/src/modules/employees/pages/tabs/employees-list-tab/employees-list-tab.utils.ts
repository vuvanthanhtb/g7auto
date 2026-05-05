import type { EmployeeListSearchForm, EmployeeListSearchQuery } from "./employees-list-tab.type";

export const parseEmployeeListFormSearch = (
  data: EmployeeListSearchForm,
): EmployeeListSearchQuery => {
  const params: EmployeeListSearchQuery = {
    page: data.page,
    size: data.size,
  };

  if (data.fullName) {
    params.fullName = data.fullName;
  }

  if (data.employeeStatus?.value) {
    params.employeeStatus = data.employeeStatus.value;
  }

  return params;
};
