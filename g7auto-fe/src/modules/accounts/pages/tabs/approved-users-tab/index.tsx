import BaseFormComponent from "@/libs/components/ui/base-form";
import BaseTableComponent from "@/libs/components/ui/base-table";
import { BTN_SEARCH, BTN_REFRESH } from "@/libs/constants";
import { userApproveActionOptions } from "@/libs/constants/options.constant";
import { getApprovedUsers } from "@/modules/accounts/shell/accounts.slice";
import { useAppDispatch } from "@/shell/redux/hooks";
import { useState, useEffect } from "react";
import { normalize } from "../../account.utils";
import {
  approvedSearchConfig,
  approvedColumns,
} from "./approved-users-tab.config";

const ApprovedUsersTab = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<Record<string, unknown>>({});

  useEffect(() => {
    dispatch(getApprovedUsers({ page, size: 10, ...searchParams }));
  }, [dispatch, page, searchParams]);

  const searchHandlers = {
    [BTN_SEARCH]: (values: Record<string, unknown>) => {
      setSearchParams(normalize(values));
      setPage(1);
    },
    [BTN_REFRESH]: () => {
      dispatch(getApprovedUsers({ page, size: 10, ...searchParams }));
    },
  };

  return (
    <>
      <BaseFormComponent
        formConfig={approvedSearchConfig}
        options={{ userApproveActionOptions }}
        handlers={searchHandlers}
      />
      <BaseTableComponent
        tableConfig={approvedColumns}
        reducer="accounts"
        state="approvedTable"
        handlePageChange={(_, p) => setPage(p)}
      />
    </>
  );
};

export default ApprovedUsersTab;
