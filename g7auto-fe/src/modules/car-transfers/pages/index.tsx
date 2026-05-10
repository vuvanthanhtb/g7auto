import { useEffect } from "react";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseFormComponent from "@/libs/components/ui/base-form";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import {
  getCarTransferColumns,
  getCarTransferSearchConfig,
  getCarTransfersFormConfig,
  transferStatusOptions,
} from "./car-transfers.config";
import { carTransfersValidation } from "./car-transfers.validation";
import { useCarTransfers } from "./use-car-transfers";
import { t } from "@/libs/i18n";
import type { CarTransferSearchForm } from "./car-transfers.type";

const CarTransfersPage = () => {
  const {
    searchParams,
    drawerOpen,
    detailId,
    selected,
    createOpen,
    createValues,
    searchHandlers,
    createHandlers,
    handlePageChange,
    handleCellAction,
    closeDetail,
    handleConfirmExport,
    handleConfirmReceive,
    handleCancel,
    setCreateOpen,
    setCreateValues,
    onchange,
  } = useCarTransfers();

  useEffect(() => {
    document.title = t("TRANSFERS_PAGE_TITLE");
  }, []);

  const status = selected?.status;
  const canConfirmExport = detailId && status === "PENDING";
  const canConfirmReceive = detailId && status === "EXPORTED";
  const canCancel = detailId && (status === "PENDING" || status === "EXPORTED");

  return (
    <Box sx={{ p: 3 }}>
      <BaseFormComponent<CarTransferSearchForm>
        formConfig={getCarTransferSearchConfig()}
        options={{ transferStatusOptions }}
        handlers={searchHandlers}
        values={searchParams}
        onChange={onchange}
      />
      <BaseTableComponent
        tableConfig={getCarTransferColumns()}
        reducer="carTransfers"
        state="carTransferTable"
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
        title={t("TRANSFERS_PAGE_HEADER")}
        extra={
          <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
            {t("TRANSFERS_BTN_CREATE")}
          </Button>
        }
      />

      {/* Detail drawer */}
      <BaseDrawer open={drawerOpen} title={t("TRANSFERS_DRAWER_DETAIL")} onClose={closeDetail}>
        {selected && (
          <Box sx={{ p: 1 }}>
            <Stack spacing={1.5}>
              {[
                ["Số khung xe", selected.carChassisNumber],
                ["Từ showroom", selected.fromShowroomName],
                ["Đến showroom", selected.toShowroomName],
                ["Lý do", selected.reason],
                ["Ngày chuyển", selected.transferDate],
                ["Ngày nhận dự kiến", selected.expectedReceiveDate],
                ["Ngày nhận thực tế", selected.actualReceiveDate],
                ["Ghi chú", selected.notes],
              ]
                .filter(([, v]) => v)
                .map(([label, value]) => (
                  <Box key={label} sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 140 }}>{label}:</Typography>
                    <Typography variant="body2">{value}</Typography>
                  </Box>
                ))}
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 140 }}>Trạng thái:</Typography>
                <Chip label={selected.status} size="small" />
              </Box>
            </Stack>
            {(canConfirmExport || canConfirmReceive || canCancel) && (
              <>
                <Divider sx={{ my: 2 }} />
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {canConfirmExport && (
                    <Button variant="contained" color="primary" onClick={handleConfirmExport}>
                      {t("TRANSFERS_BTN_CONFIRM_EXPORT")}
                    </Button>
                  )}
                  {canConfirmReceive && (
                    <Button variant="contained" color="success" onClick={handleConfirmReceive}>
                      {t("TRANSFERS_BTN_CONFIRM_RECEIVE")}
                    </Button>
                  )}
                  {canCancel && (
                    <Button variant="outlined" color="error" onClick={handleCancel}>
                      {t("TRANSFERS_BTN_CANCEL")}
                    </Button>
                  )}
                </Stack>
              </>
            )}
          </Box>
        )}
      </BaseDrawer>

      {/* Create drawer */}
      <BaseDrawer open={createOpen} title={t("TRANSFERS_DRAWER_CREATE")} onClose={() => setCreateOpen(false)}>
        <BaseFormComponent
          formConfig={getCarTransfersFormConfig()}
          validationSchema={carTransfersValidation}
          values={createValues}
          onChange={(d) => setCreateValues((p) => ({ ...p, ...d }))}
          handlers={createHandlers}
        />
      </BaseDrawer>
    </Box>
  );
};

export default CarTransfersPage;
