export interface AccountPendingApprovalQuery {
  username?: string;
  fullName?: string;
  fromDate?: string;
  toDate?: string;
  page: number;
  size: number;
}
