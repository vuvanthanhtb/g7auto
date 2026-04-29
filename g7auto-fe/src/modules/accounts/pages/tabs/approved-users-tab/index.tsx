import BaseFormComponent from "@/libs/components/ui/base-form";
import BaseTableComponent from "@/libs/components/ui/base-table";
import { BTN_SEARCH, BTN_REFRESH, APPROVED, REJECTED } from "@/libs/constants";
import { getApprovedUsers } from "@/modules/accounts/shell/accounts.slice";
import { useAppDispatch } from "@/shell/redux/hooks";
import { useState, useEffect } from "react";
import {
  approvedSearchConfig,
  approvedColumns,
  statusOptions,
  approvedInitialValues,
} from "./approved-users-tab.config";
import type { AccountApprovalQuery } from "./approved-users-tab.type";
import type { TableRow } from "../../account.utils";

const ApprovedUsersTab = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useState<AccountApprovalQuery>(
    approvedInitialValues,
  );

  useEffect(() => {
    dispatch(getApprovedUsers(approvedInitialValues));
  }, [dispatch]);

  const onChange = (values: AccountApprovalQuery) => {
    setSearchParams(values);
  };

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => ({ ...prev, page }));
    dispatch(getApprovedUsers({ ...searchParams, page }));
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: AccountApprovalQuery) => {
      setSearchParams(values);
      dispatch(getApprovedUsers(values));
    },
    [BTN_REFRESH]: () => {
      setSearchParams(approvedInitialValues);
      dispatch(getApprovedUsers(approvedInitialValues));
    },
  };

  const colorCell = (refColor: string[], row: TableRow) => {
    const status = row[refColor[0]] as string;
    if (status === APPROVED) {
      return "#0000ffb5";
    }
    if (status === REJECTED) {
      return "#ff0000b3";
    }
    return "#000";
  };

  return (
    <>
      <BaseFormComponent<AccountApprovalQuery>
        formConfig={approvedSearchConfig}
        values={searchParams}
        options={{ statusOptions }}
        handlers={searchHandlers}
        onChange={onChange}
      />
      <BaseTableComponent
        tableConfig={approvedColumns}
        reducer="accounts"
        state="approvedTable"
        handlePageChange={handlePageChange}
        colorCell={colorCell}
      />
    </>
  );
};

export default ApprovedUsersTab;
