import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import {
  getDepositColumns,
  getDepositsFormConfig,
  getDepositsDetailFormConfig,
  getDepositSearchConfig,
} from "./deposits.config";
import { depositsValidation } from "./deposits.validation";
import { depositStatusOptions, depositPaymentMethodOptions } from "@/libs/constants/options.constant";
import { useDeposits } from "./use-deposits";
import { t } from "@/libs/i18n";

const DepositsPage = () => {
  const {
    drawerOpen,
    editId,
    formValues,
    searchQuery,
    openCreate,
    closeDrawer,
    handleCellAction,
    searchHandlers,
    formHandlers,
    detailHandlers,
    setFormValues,
    handlePageChange,
  } = useDeposits();

  return (
    <Box sx={{ p: 3 }}>
      <BaseFormComponent
        formConfig={getDepositSearchConfig()}
        options={{ depositStatusOptions }}
        values={searchQuery}
        handlers={searchHandlers}
      />
      <BaseTableComponent
        tableConfig={getDepositColumns()}
        reducer="deposits"
        state="depositTable"
        title={t("DEPOSITS_PAGE_HEADER")}
        extra={
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            {t("DEPOSITS_BTN_CREATE")}
          </Button>
        }
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? t("DEPOSITS_DRAWER_DETAIL") : t("DEPOSITS_BTN_CREATE")}
        onClose={closeDrawer}
      >
        {editId ? (
          <BaseFormComponent
            formConfig={getDepositsDetailFormConfig()}
            values={formValues}
            onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
            handlers={detailHandlers}
          />
        ) : (
          <BaseFormComponent
            formConfig={getDepositsFormConfig()}
            validationSchema={depositsValidation}
            values={formValues}
            options={{ depositPaymentMethodOptions }}
            onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
            handlers={formHandlers}
          />
        )}
      </BaseDrawer>
    </Box>
  );
};

export default DepositsPage;
