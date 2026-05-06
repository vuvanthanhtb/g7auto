import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import { getDepositColumns, getDepositsFormConfig, getDepositSearchConfig } from "./deposits.config";
import { depositsValidation } from "./deposits.validation";
import { BTN_SUBMIT } from "@/libs/constants/button.constant";
import { depositStatusOptions } from "@/libs/constants/options.constant";
import { useDeposits } from "./use-deposits";
import { t } from "@/libs/i18n";

const DepositsPage = () => {
  const {
    drawerOpen, editId, formValues, page,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers,
    setFormValues, setPage,
  } = useDeposits();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight={700} className="page-title">
          {t("DEPOSITS_PAGE_HEADER")}
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          {t("DEPOSITS_BTN_CREATE")}
        </Button>
      </Box>
      <BaseFormComponent formConfig={getDepositSearchConfig()} options={{ depositStatusOptions }} handlers={searchHandlers} />
      <BaseTableComponent
        tableConfig={getDepositColumns()}
        reducer="deposits"
        state="depositTable"
        handleCellAction={handleCellAction}
        handlePageChange={(_, p) => setPage(p)}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? t("DEPOSITS_DRAWER_DETAIL") : t("DEPOSITS_BTN_CREATE")}
        onClose={closeDrawer}
      >
        <BaseFormComponent
          formConfig={getDepositsFormConfig()}
          validationSchema={depositsValidation}
          values={formValues}
          onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
          handlers={formHandlers}
        />
      </BaseDrawer>
    </Box>
  );
};

export default DepositsPage;
