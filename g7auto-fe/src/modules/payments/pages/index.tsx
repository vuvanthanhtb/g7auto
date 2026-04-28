import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import {
  getPayments,
  createPayments,
  getPaymentsById,
  clearSelectedPayments,
} from "../shell/payments.slice";
import { paymentsService } from "../shell/payments.service";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import type { PaymentRequest } from "../shell/payments.type";
import {
  paymentColumns,
  paymentsFormConfig,
  paymentsInitialValues,
  paymentSearchConfig,
} from "./payments.config";
import { paymentsValidation } from "./payments.validation";
import {
  BTN_SUBMIT,
  BTN_DETAIL,
  BTN_REFRESH,
  BTN_EXPORT,
} from "@/libs/constants/button.constant";

type TableRow = Record<string, unknown>;

const PaymentsPage = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.payments);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(paymentsInitialValues);
  const [page, setPage] = useState(1);

  useEffect(() => {
    document.title = "Thanh toán — G7Auto";
    dispatch(getPayments({ page, size: 10 }));
  }, [dispatch, page]);

  useEffect(() => {
    if (selected && editId)
      setFormValues(selected as unknown as Record<string, unknown>);
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setFormValues(paymentsInitialValues);
    setDrawerOpen(true);
  };

  const handleCellAction = (row: TableRow, key?: string) => {
    if (key === BTN_DETAIL) {
      setEditId(row.id as number);
      dispatch(getPaymentsById(row.id as number));
      setDrawerOpen(true);
    }
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (!editId)
      await dispatch(createPayments(data as unknown as PaymentRequest));
    setDrawerOpen(false);
    dispatch(clearSelectedPayments());
    dispatch(getPayments({ page, size: 10 }));
  };

  const searchHandlers = {
    [BTN_REFRESH]: () => { dispatch(getPayments({ page, size: 10 })); },
    [BTN_EXPORT]: async () => { await paymentsService.exportExcel(); },
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight={700} className="page-title">
          Quản lý Thanh toán
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          Tạo thanh toán
        </Button>
      </Box>
      <BaseFormComponent formConfig={paymentSearchConfig} handlers={searchHandlers} />
      <BaseTableComponent
        tableConfig={paymentColumns}
        reducer="payments"
        state="paymentTable"
        handleCellAction={handleCellAction}
        handlePageChange={(_, p) => setPage(p)}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? "Chi tiết thanh toán" : "Tạo thanh toán"}
        onClose={() => { setDrawerOpen(false); dispatch(clearSelectedPayments()); }}
      >
        <BaseFormComponent
          formConfig={paymentsFormConfig}
          validationSchema={paymentsValidation}
          values={formValues}
          onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
          handlers={{ [BTN_SUBMIT]: handleSubmit }}
        />
      </BaseDrawer>
    </Box>
  );
};

export default PaymentsPage;
