import type {
  EmployeeApprovedSearchForm,
  EmployeeApprovedSearchQuery,
} from "./employees-approved-tab.type";

export const parseApprovedFormSearch = (
  data: EmployeeApprovedSearchForm,
): EmployeeApprovedSearchQuery => {
  const params: EmployeeApprovedSearchQuery = {
    page: data.page,
    size: data.size,
    statusApproving: "APPROVED",
  };

  if (data.fullName) {
    params.fullName = data.fullName;
  }

  return params;
};
