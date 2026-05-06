import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import { getQuotationColumns, getQuotationsFormConfig, getQuotationSearchConfig } from "./quotations.config";
import { quotationsValidation } from "./quotations.validation";
import { BTN_SUBMIT } from "@/libs/constants/button.constant";
import { quotationStatusOptions } from "@/libs/constants/options.constant";
import { useQuotations } from "./use-quotations";
import { t } from "@/libs/i18n";

const QuotationsPage = () => {
  const {
    drawerOpen, editId, formValues, page,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers,
    setFormValues, setPage,
  } = useQuotations();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight={700} className="page-title">
          {t("QUOTATIONS_PAGE_HEADER")}
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          {t("QUOTATIONS_BTN_CREATE")}
        </Button>
      </Box>
      <BaseFormComponent formConfig={getQuotationSearchConfig()} options={{ quotationStatusOptions }} handlers={searchHandlers} />
      <BaseTableComponent
        tableConfig={getQuotationColumns()}
        reducer="quotations"
        state="quotationTable"
        handleCellAction={handleCellAction}
        handlePageChange={(_, p) => setPage(p)}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? t("QUOTATIONS_DRAWER_DETAIL") : t("QUOTATIONS_BTN_CREATE")}
        onClose={closeDrawer}
      >
        <BaseFormComponent
          formConfig={getQuotationsFormConfig()}
          validationSchema={quotationsValidation}
          values={formValues}
          onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
          handlers={formHandlers}
        />
      </BaseDrawer>
    </Box>
  );
};

export default QuotationsPage;
