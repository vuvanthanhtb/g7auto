import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import {
  getPaymentColumns,
  getPaymentsFormConfig,
  getPaymentsDetailFormConfig,
  getPaymentSearchConfig,
} from "./payments.config";
import { paymentsValidation, paymentsDetailValidation } from "./payments.validation";
import { paymentMethodOptions, paymentStatusOptions } from "@/libs/constants/options.constant";
import { usePayments } from "./use-payments";
import { t } from "@/libs/i18n";

const PaymentsPage = () => {
  const {
    drawerOpen, editId, formValues, searchQuery,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers, detailHandlers,
    setFormValues, handlePageChange,
  } = usePayments();

  return (
    <Box sx={{ p: 3 }}>
      <BaseFormComponent formConfig={getPaymentSearchConfig()} options={{ paymentStatusOptions }} values={searchQuery} handlers={searchHandlers} />
      <BaseTableComponent
        tableConfig={getPaymentColumns()}
        reducer="payments"
        state="paymentTable"
        title={t("PAYMENTS_PAGE_HEADER")}
        extra={
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            {t("PAYMENTS_BTN_CREATE")}
          </Button>
        }
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? t("PAYMENTS_DRAWER_DETAIL") : t("PAYMENTS_BTN_CREATE")}
        onClose={closeDrawer}
      >
        {editId ? (
          <BaseFormComponent
            formConfig={getPaymentsDetailFormConfig()}
            validationSchema={paymentsDetailValidation}
            values={formValues}
            onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
            handlers={detailHandlers}
          />
        ) : (
          <BaseFormComponent
            formConfig={getPaymentsFormConfig()}
            validationSchema={paymentsValidation}
            options={{ paymentMethodOptions }}
            values={formValues}
            onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
            handlers={formHandlers}
          />
        )}
      </BaseDrawer>
    </Box>
  );
};

export default PaymentsPage;
