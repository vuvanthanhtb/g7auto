import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import { getContractColumns, getContractsFormConfig, getContractSearchConfig } from "./contracts.config";
import { contractsValidation } from "./contracts.validation";
import { BTN_SUBMIT } from "@/libs/constants/button.constant";
import { contractStatusOptions } from "@/libs/constants/options.constant";
import { useContracts } from "./use-contracts";
import { t } from "@/libs/i18n";

const ContractsPage = () => {
  const {
    drawerOpen, editId, formValues, page,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers,
    setFormValues, setPage,
  } = useContracts();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight={700} className="page-title">
          {t("PAGE_HEADER_CONTRACTS")}
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          {t("BTN_CREATE_CONTRACT")}
        </Button>
      </Box>
      <BaseFormComponent formConfig={getContractSearchConfig()} options={{ contractStatusOptions }} handlers={searchHandlers} />
      <BaseTableComponent
        tableConfig={getContractColumns()}
        reducer="contracts"
        state="contractTable"
        handleCellAction={handleCellAction}
        handlePageChange={(_, p) => setPage(p)}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? t("DRAWER_DETAIL_CONTRACT") : t("BTN_CREATE_CONTRACT")}
        onClose={closeDrawer}
      >
        <BaseFormComponent
          formConfig={getContractsFormConfig()}
          validationSchema={contractsValidation}
          values={formValues}
          onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
          handlers={formHandlers}
        />
      </BaseDrawer>
    </Box>
  );
};

export default ContractsPage;
