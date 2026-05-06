import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import {
  getCarTransferColumns,
  getCarTransfersFormConfig,
  getCarTransferSearchConfig,
} from "./car-transfers.config";
import { carTransfersValidation } from "./car-transfers.validation";
import { transferStatusOptions } from "@/libs/constants/options.constant";
import { useCarTransfers } from "./use-car-transfers";
import { t } from "@/libs/i18n";

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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight={700} className="page-title">
          {t("TRANSFERS_PAGE_HEADER")}
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          {t("TRANSFERS_BTN_CREATE")}
        </Button>
      </Box>
      <BaseFormComponent
        formConfig={getCarTransferSearchConfig()}
        options={{ transferStatusOptions }}
        handlers={searchHandlers}
      />
      <BaseTableComponent
        tableConfig={getCarTransferColumns()}
        reducer="carTransfers"
        state="carTransferTable"
        handleCellAction={handleCellAction}
        handlePageChange={(_, p) => setPage(p)}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? t("TRANSFERS_DRAWER_DETAIL") : t("TRANSFERS_DRAWER_CREATE")}
        onClose={closeDrawer}
      >
        <BaseFormComponent
          formConfig={getCarTransfersFormConfig()}
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
