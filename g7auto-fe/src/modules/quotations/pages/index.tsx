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
import {
  quotationsValidation,
  quotationsDetailValidation,
} from "./quotations.validation";
import { quotationStatusOptions } from "@/libs/constants/options.constant";
import { useQuotations } from "./use-quotations";
import { t } from "@/libs/i18n";
import type {
  QuotationSearchForm,
  QuotationCreateFormValues,
  QuotationDetailFormValues,
} from "../shell/quotations.type";

const QuotationsPage = () => {
  const {
    drawerOpen,
    editId,
    createFormValues,
    detailFormValues,
    searchQuery,
    customerOptions,
    carOptions,
    employeeOptions,
    openCreate,
    closeDrawer,
    handleCellAction,
    searchHandlers,
    formHandlers,
    detailHandlers,
    setCreateFormValues,
    setDetailFormValues,
    handlePageChange,
  } = useQuotations();

  return (
    <Box sx={{ p: 3 }}>
      <BaseFormComponent<QuotationSearchForm>
        formConfig={getQuotationSearchConfig()}
        options={{ quotationStatusOptions }}
        values={searchQuery}
        handlers={searchHandlers}
      />
      <BaseTableComponent
        tableConfig={getQuotationColumns()}
        reducer="quotations"
        state="quotationTable"
        title={t("QUOTATIONS_PAGE_HEADER")}
        extra={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreate}
          >
            {t("QUOTATIONS_BTN_CREATE")}
          </Button>
        }
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
      />
      <BaseDrawer
        open={drawerOpen}
        title={
          editId ? t("QUOTATIONS_DRAWER_DETAIL") : t("QUOTATIONS_BTN_CREATE")
        }
        onClose={closeDrawer}
      >
        {editId ? (
          <BaseFormComponent<QuotationDetailFormValues>
            formConfig={getQuotationsDetailFormConfig()}
            validationSchema={quotationsDetailValidation}
            values={detailFormValues}
            onChange={setDetailFormValues}
            handlers={detailHandlers}
          />
        ) : (
          <BaseFormComponent<QuotationCreateFormValues>
            formConfig={getQuotationsFormConfig()}
            validationSchema={quotationsValidation}
            values={createFormValues}
            options={{ customerOptions, carOptions, employeeOptions }}
            onChange={setCreateFormValues}
            handlers={formHandlers}
          />
        )}
      </BaseDrawer>
    </Box>
  );
};

export default QuotationsPage;
