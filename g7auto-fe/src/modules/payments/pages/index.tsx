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
import { paymentMethodOptions, paymentStatusOptions, vietnameseBankOptions } from "@/libs/constants/options.constant";
import { usePayments } from "./use-payments";
import { t } from "@/libs/i18n";
import type { PaymentSearchForm, PaymentCreateFormValues, PaymentDetailFormValues } from "../shell/payments.type";
import BankTransferQR from "../components/BankTransferQR";

const PaymentsPage = () => {
  const {
    drawerOpen, editId, createFormValues, detailFormValues, searchQuery,
    contractOptions,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers, detailHandlers,
    setCreateFormValues, setDetailFormValues, handlePageChange,
  } = usePayments();

  return (
    <Box sx={{ p: 3 }}>
      <BaseFormComponent<PaymentSearchForm> formConfig={getPaymentSearchConfig()} options={{ paymentStatusOptions }} values={searchQuery} handlers={searchHandlers} />
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
          <BaseFormComponent<PaymentDetailFormValues>
            formConfig={getPaymentsDetailFormConfig()}
            validationSchema={paymentsDetailValidation}
            values={detailFormValues}
            onChange={setDetailFormValues}
            handlers={detailHandlers}
          />
        ) : (
          <>
            <BaseFormComponent<PaymentCreateFormValues>
              formConfig={getPaymentsFormConfig()}
              validationSchema={paymentsValidation}
              options={{ paymentMethodOptions, vietnameseBankOptions, contractOptions }}
              values={createFormValues}
              onChange={setCreateFormValues}
              handlers={formHandlers}
            />
            {(createFormValues.method as { value?: string } | null)?.value === "BANK_TRANSFER" && (
              <BankTransferQR
                bankId={createFormValues.bankId as { label: string; value: string } | null}
                bankAccountNo={createFormValues.bankAccountNo as string}
                bankContent={createFormValues.bankContent as string}
                amount={createFormValues.amount as number | undefined}
              />
            )}
          </>
        )}
      </BaseDrawer>
    </Box>
  );
};

export default PaymentsPage;
