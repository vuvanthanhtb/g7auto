export interface AccountApprovalQuery {
  fromDate?: string;
  toDate?: string;
  username?: string;
  fullName?: string;
  statusApproving?: Record<string, string>;
  page: number;
  size: number;
}
