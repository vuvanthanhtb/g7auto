import type {
  EmployeePendingSearchForm,
  EmployeePendingSearchQuery,
} from "./employees-pending-tab.type";

export const parsePendingFormSearch = (
  data: EmployeePendingSearchForm,
): EmployeePendingSearchQuery => {
  const params: EmployeePendingSearchQuery = {
    page: data.page,
    size: data.size,
    statusApproving: "AWAITING_APPROVAL",
  };

  if (data.fullName) {
    params.fullName = data.fullName;
  }

  return params;
};
