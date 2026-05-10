import { APPROVED, PENDING, REJECTED } from "@/libs/constants";
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
    statusApproving: APPROVED,
  };

  if (data.fullName) {
    params.fullName = data.fullName;
  }

  return params;
};

export const parseStatusApprovingDisplay = (data: string) => {
  switch (data) {
    case APPROVED:
      return "Đã duyệt";
    case PENDING:
      return "Đang chờ";
    case REJECTED:
      return "Đã từ chối";
    default:
      return "";
  }
};
