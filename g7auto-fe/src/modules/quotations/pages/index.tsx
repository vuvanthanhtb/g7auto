import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import {
  getQuotationColumns,
  getQuotationsFormConfig,
  getQuotationsDetailFormConfig,
  getQuotationSearchConfig,
} from "./quotations.config";
import { quotationsValidation, quotationsDetailValidation } from "./quotations.validation";
import { quotationStatusOptions } from "@/libs/constants/options.constant";
import { useQuotations } from "./use-quotations";
import { t } from "@/libs/i18n";

const QuotationsPage = () => {
  const {
    drawerOpen, editId, formValues, searchQuery,
    customerOptions, carOptions, employeeOptions,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers, detailHandlers,
    setFormValues, handlePageChange,
  } = useQuotations();

  return (
    <Box sx={{ p: 3 }}>
      <BaseFormComponent formConfig={getQuotationSearchConfig()} options={{ quotationStatusOptions }} values={searchQuery} handlers={searchHandlers} />
      <BaseTableComponent
        tableConfig={getQuotationColumns()}
        reducer="quotations"
        state="quotationTable"
        title={t("QUOTATIONS_PAGE_HEADER")}
        extra={
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            {t("QUOTATIONS_BTN_CREATE")}
          </Button>
        }
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? t("QUOTATIONS_DRAWER_DETAIL") : t("QUOTATIONS_BTN_CREATE")}
        onClose={closeDrawer}
      >
        {editId ? (
          <BaseFormComponent
            formConfig={getQuotationsDetailFormConfig()}
            validationSchema={quotationsDetailValidation}
            values={formValues}
            onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
            handlers={detailHandlers}
          />
        ) : (
          <BaseFormComponent
            formConfig={getQuotationsFormConfig()}
            validationSchema={quotationsValidation}
            values={formValues}
            options={{ customerOptions, carOptions, employeeOptions }}
            onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
            handlers={formHandlers}
          />
        )}
      </BaseDrawer>
    </Box>
  );
};

export default QuotationsPage;
