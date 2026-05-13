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
import {
  contractsValidation,
  contractsUpdateValidation,
} from "./contracts.validation";
import { contractStatusOptions } from "@/libs/constants/options.constant";
import { useContracts } from "./use-contracts";
import { t } from "@/libs/i18n";
import type {
  ContractSearchForm,
  ContractCreateFormValues,
  ContractUpdateFormValues,
} from "../shell/contracts.type";

const ContractsPage = () => {
  const {
    drawerOpen,
    editId,
    createFormValues,
    updateFormValues,
    searchQuery,
    customerOptions,
    carOptions,
    employeeOptions,
    depositOptions,
    openCreate,
    closeDrawer,
    handleCellAction,
    searchHandlers,
    createFormHandlers,
    updateFormHandlers,
    setCreateFormValues,
    setUpdateFormValues,
    handlePageChange,
  } = useContracts();

  return (
    <Box sx={{ p: 3 }}>
      <BaseFormComponent<ContractSearchForm>
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
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreate}
          >
            {t("CONTRACTS_BTN_CREATE")}
          </Button>
        }
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
      />
      <BaseDrawer
        open={drawerOpen}
        title={
          editId ? t("CONTRACTS_DRAWER_DETAIL") : t("CONTRACTS_BTN_CREATE")
        }
        onClose={closeDrawer}
      >
        {editId ? (
          <BaseFormComponent<ContractUpdateFormValues>
            formConfig={getContractsUpdateFormConfig()}
            validationSchema={contractsUpdateValidation}
            values={updateFormValues}
            options={{ contractStatusOptions }}
            onChange={setUpdateFormValues}
            handlers={updateFormHandlers}
          />
        ) : (
          <BaseFormComponent<ContractCreateFormValues>
            formConfig={getContractsFormConfig()}
            validationSchema={contractsValidation}
            options={{ customerOptions, carOptions, employeeOptions, depositOptions }}
            values={createFormValues}
            onChange={setCreateFormValues}
            handlers={createFormHandlers}
          />
        )}
      </BaseDrawer>
    </Box>
  );
};

export default ContractsPage;
