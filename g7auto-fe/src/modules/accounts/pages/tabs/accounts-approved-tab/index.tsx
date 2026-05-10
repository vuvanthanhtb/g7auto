import BaseFormComponent from "@/libs/components/ui/base-form";
import BaseTableComponent from "@/libs/components/ui/base-table";
import { BTN_SEARCH, BTN_REFRESH } from "@/libs/constants";
import { getApprovedUsers } from "@/modules/accounts/shell/accounts.slice";
import { useAppDispatch } from "@/shell/redux/hooks";
import { useState, useEffect } from "react";
import {
  getApprovedSearchConfig,
  getApprovedColumns,
  statusOptions,
  approvedInitialValues,
} from "./approved-users-tab.config";
import type { AccountApprovedSearchForm } from "./approved-users-tab.type";
import { colorStatusCell } from "@/libs/utils";

const AccountApprovedTab = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useState<AccountApprovedSearchForm>(
    approvedInitialValues,
  );

  useEffect(() => {
    dispatch(getApprovedUsers(approvedInitialValues));
  }, [dispatch]);

  const onChange = (values: AccountApprovedSearchForm) => {
    setSearchParams(values);
  };

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => ({ ...prev, page }));
    dispatch(getApprovedUsers({ ...searchParams, page }));
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: AccountApprovedSearchForm) => {
      setSearchParams(values);
      dispatch(getApprovedUsers(values));
    },
    [BTN_REFRESH]: () => {
      setSearchParams(approvedInitialValues);
      dispatch(getApprovedUsers(approvedInitialValues));
    },
  };

  return (
    <>
      <BaseFormComponent<AccountApprovedSearchForm>
        formConfig={getApprovedSearchConfig()}
        values={searchParams}
        options={{ statusOptions }}
        handlers={searchHandlers}
        onChange={onChange}
      />
      <BaseTableComponent
        tableConfig={getApprovedColumns()}
        reducer="accounts"
        state="approvedTable"
        handlePageChange={handlePageChange}
        colorCell={colorStatusCell}
      />
    </>
  );
};

export default AccountApprovedTab;
