import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import {
  carTransferColumns,
  carTransfersFormConfig,
  carTransferSearchConfig,
} from "./car-transfers.config";
import { carTransfersValidation } from "./car-transfers.validation";
import { transferStatusOptions } from "@/libs/constants/options.constant";
import { useCarTransfers } from "./use-car-transfers";

const CarTransfersPage = () => {
  const {
    drawerOpen,
    editId,
    formValues,
    page,
    openCreate,
    closeDrawer,
    handleCellAction,
    searchHandlers,
    formHandlers,
    setFormValues,
    setPage,
  } = useCarTransfers();

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight={700} className="page-title">
          Quản lý Điều chuyển xe
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreate}
        >
          Tạo phiếu
        </Button>
      </Box>
      <BaseFormComponent
        formConfig={carTransferSearchConfig}
        options={{ transferStatusOptions }}
        handlers={searchHandlers}
      />
      <BaseTableComponent
        tableConfig={carTransferColumns}
        reducer="carTransfers"
        state="carTransferTable"
        handleCellAction={handleCellAction}
        handlePageChange={(_, p) => setPage(p)}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? "Chi tiết điều chuyển" : "Tạo phiếu điều chuyển"}
        onClose={closeDrawer}
      >
        <BaseFormComponent
          formConfig={carTransfersFormConfig}
          validationSchema={carTransfersValidation}
          values={formValues}
          onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
          handlers={formHandlers}
        />
      </BaseDrawer>
    </Box>
  );
};

export default CarTransfersPage;
