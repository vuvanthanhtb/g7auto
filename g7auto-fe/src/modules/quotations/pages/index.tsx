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
          {t("PAGE_HEADER_QUOTATIONS")}
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          {t("BTN_CREATE_QUOTATION")}
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
        title={editId ? t("DRAWER_DETAIL_QUOTATION") : t("BTN_CREATE_QUOTATION")}
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
