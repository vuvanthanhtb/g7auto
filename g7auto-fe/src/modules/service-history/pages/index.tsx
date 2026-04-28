import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import {
  getServiceHistory,
  createServiceHistory,
  getServiceHistoryById,
  clearSelectedServiceHistory,
} from "../shell/service-history.slice";
import { serviceHistoryService } from "../shell/service-history.service";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import type { ServiceHistoryRequest } from "../shell/service-history.type";
import {
  serviceHistoryColumns,
  serviceHistoryFormConfig,
  serviceHistoryInitialValues,
  serviceHistorySearchConfig,
} from "./service-history.config";
import { serviceHistoryValidation } from "./service-history.validation";
import {
  BTN_SUBMIT,
  BTN_EDIT,
  BTN_REFRESH,
  BTN_EXPORT,
} from "@/libs/constants/button.constant";

type TableRow = Record<string, unknown>;

const ServiceHistoryPage = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.serviceHistory);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(serviceHistoryInitialValues);
  const [page, setPage] = useState(1);

  useEffect(() => {
    document.title = "Lịch sử dịch vụ — G7Auto";
    dispatch(getServiceHistory({ page, size: 10 }));
  }, [dispatch, page]);

  useEffect(() => {
    if (selected && editId)
      setFormValues(selected as unknown as Record<string, unknown>);
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setFormValues(serviceHistoryInitialValues);
    setDrawerOpen(true);
  };

  const handleCellAction = (row: TableRow, key?: string) => {
    if (key === BTN_EDIT) {
      setEditId(row.id as number);
      dispatch(getServiceHistoryById(row.id as number));
      setDrawerOpen(true);
    }
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (!editId)
      await dispatch(createServiceHistory(data as unknown as ServiceHistoryRequest));
    setDrawerOpen(false);
    dispatch(clearSelectedServiceHistory());
    dispatch(getServiceHistory({ page, size: 10 }));
  };

  const searchHandlers = {
    [BTN_REFRESH]: () => { dispatch(getServiceHistory({ page, size: 10 })); },
    [BTN_EXPORT]: async () => { await serviceHistoryService.exportExcel(); },
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight={700} className="page-title">
          Quản lý Lịch sử dịch vụ
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          Thêm dịch vụ
        </Button>
      </Box>
      <BaseFormComponent formConfig={serviceHistorySearchConfig} handlers={searchHandlers} />
      <BaseTableComponent
        tableConfig={serviceHistoryColumns}
        reducer="serviceHistory"
        state="serviceHistoryTable"
        handleCellAction={handleCellAction}
        handlePageChange={(_, p) => setPage(p)}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? "Chỉnh sửa" : "Thêm dịch vụ"}
        onClose={() => { setDrawerOpen(false); dispatch(clearSelectedServiceHistory()); }}
      >
        <BaseFormComponent
          formConfig={serviceHistoryFormConfig}
          validationSchema={serviceHistoryValidation}
          values={formValues}
          onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
          handlers={{ [BTN_SUBMIT]: handleSubmit }}
        />
      </BaseDrawer>
    </Box>
  );
};

export default ServiceHistoryPage;
