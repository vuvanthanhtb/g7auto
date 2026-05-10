import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import {
  getContractColumns,
  getContractsFormConfig,
  getContractsUpdateFormConfig,
  getContractSearchConfig,
} from "./contracts.config";
import { contractsValidation, contractsUpdateValidation } from "./contracts.validation";
import { contractStatusOptions } from "@/libs/constants/options.constant";
import { useContracts } from "./use-contracts";
import { t } from "@/libs/i18n";

const ContractsPage = () => {
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
    updateFormHandlers,
    setFormValues,
    handlePageChange,
  } = useContracts();

  return (
    <Box sx={{ p: 3 }}>
      <BaseFormComponent
        formConfig={getContractSearchConfig()}
        options={{ contractStatusOptions }}
        values={searchQuery}
        handlers={searchHandlers}
      />
      <BaseTableComponent
        tableConfig={getContractColumns()}
        reducer="contracts"
        state="contractTable"
        title={t("CONTRACTS_PAGE_HEADER")}
        extra={
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            {t("CONTRACTS_BTN_CREATE")}
          </Button>
        }
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? t("CONTRACTS_DRAWER_DETAIL") : t("CONTRACTS_BTN_CREATE")}
        onClose={closeDrawer}
      >
        {editId ? (
          <BaseFormComponent
            formConfig={getContractsUpdateFormConfig()}
            validationSchema={contractsUpdateValidation}
            values={formValues}
            options={{ contractStatusOptions }}
            onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
            handlers={updateFormHandlers}
          />
        ) : (
          <BaseFormComponent
            formConfig={getContractsFormConfig()}
            validationSchema={contractsValidation}
            values={formValues}
            onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
            handlers={formHandlers}
          />
        )}
      </BaseDrawer>
    </Box>
  );
};

export default ContractsPage;
