import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import BaseFormComponent from "@/libs/components/ui/base-form";
import BaseTableComponent from "@/libs/components/ui/base-table";
import { useConfirm } from "@/libs/components/ui/confirm-dialog";
import {
  BTN_APPROVE,
  BTN_REJECT,
  BTN_SEARCH,
  BTN_REFRESH,
} from "@/libs/constants/button.constant";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import {
  getPendingApprovals,
  approveEmployeeApproving,
  bulkApproveEmployeeApproving,
} from "@/modules/employees/shell/employees.slice";
import {
  getEmployeePendingColumns,
  getEmployeePendingSearchConfig,
  pendingInitialValues,
} from "./employees-pending-tab.config";
import { parsePendingFormSearch } from "./employees-pending-tab.utils";
import type { EmployeePendingSearchForm } from "./employees-pending-tab.type";

type TableRow = Record<string, unknown>;

const EmployeesPendingTab = () => {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const [searchParams, setSearchParams] =
    useState<EmployeePendingSearchForm>(pendingInitialValues);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const pendingContent = useAppSelector(
    (s) => s.employees.pendingTable.content,
  );

  useEffect(() => {
    dispatch(getPendingApprovals(parsePendingFormSearch(pendingInitialValues)));
  }, [dispatch]);

  const refresh = () => {
    setSearchParams(pendingInitialValues);
    setSelectedIds([]);
    dispatch(getPendingApprovals(parsePendingFormSearch(pendingInitialValues)));
  };

  const getSelectedUsernames = () =>
    pendingContent
      .filter((row) => selectedIds.includes(String(row.id)))
      .map((row) => row.username as string);

  const handleCellAction = async (row: TableRow, key?: string) => {
    if (key === BTN_APPROVE) {
      const ok = await confirm(`Duyệt yêu cầu nhân viên "${row.fullName}"?`);
      if (ok) {
        await dispatch(
          approveEmployeeApproving({
            username: row.username as string,
            action: "APPROVE",
          }),
        );
        dispatch(getPendingApprovals(parsePendingFormSearch(searchParams)));
      }
    }
    if (key === BTN_REJECT) {
      const ok = await confirm(`Từ chối yêu cầu nhân viên "${row.fullName}"?`);
      if (ok) {
        await dispatch(
          approveEmployeeApproving({
            username: row.username as string,
            action: "REJECT",
          }),
        );
        dispatch(getPendingApprovals(parsePendingFormSearch(searchParams)));
      }
    }
  };

  const handleBulkAction = async (action: "APPROVE" | "REJECT") => {
    const usernames = getSelectedUsernames();
    if (!usernames.length) return;
    const label = action === "APPROVE" ? "duyệt" : "từ chối";
    const ok = await confirm(
      `${label.charAt(0).toUpperCase() + label.slice(1)} ${usernames.length} yêu cầu đã chọn?`,
    );
    if (ok) {
      await dispatch(bulkApproveEmployeeApproving({ action, usernames }));
      setSelectedIds([]);
      dispatch(getPendingApprovals(parsePendingFormSearch(searchParams)));
    }
  };

  const handlePageChange = (page: number) => {
    const updated = { ...searchParams, page };
    setSearchParams(updated);
    dispatch(getPendingApprovals(parsePendingFormSearch(updated)));
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: EmployeePendingSearchForm) => {
      setSearchParams(values);
      dispatch(
        getPendingApprovals(parsePendingFormSearch({ ...values, page: 1 })),
      );
    },
    [BTN_REFRESH]: () => refresh(),
  };

  const onchange = (values: EmployeePendingSearchForm) => {
    setSearchParams(values);
  };

  return (
    <>
      <BaseFormComponent<EmployeePendingSearchForm>
        formConfig={getEmployeePendingSearchConfig()}
        handlers={searchHandlers}
        values={searchParams}
        onChange={onchange}
      />
      {selectedIds.length > 0 && (
        <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => handleBulkAction("APPROVE")}
          >
            Duyệt {selectedIds.length} yêu cầu
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => handleBulkAction("REJECT")}
          >
            Từ chối {selectedIds.length} yêu cầu
          </Button>
        </Box>
      )}
      <BaseTableComponent
        tableConfig={getEmployeePendingColumns()}
        reducer="employees"
        state="pendingTable"
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
        onSelectionChange={setSelectedIds}
      />
    </>
  );
};

export default EmployeesPendingTab;
