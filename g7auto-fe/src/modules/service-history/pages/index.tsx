import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import {
  getServiceHistoryColumns,
  getServiceHistoryFormConfig,
  getServiceHistorySearchConfig,
} from "./service-history.config";
import { serviceHistoryValidation } from "./service-history.validation";
import { contactTypeOptions } from "@/libs/constants/options.constant";
import { useServiceHistory } from "./use-service-history";
import { t } from "@/libs/i18n";

const ServiceHistoryPage = () => {
  const {
    drawerOpen, editId, formValues, searchQuery,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers,
    setFormValues, handlePageChange,
  } = useServiceHistory();

  return (
    <Box sx={{ p: 3 }}>
      <BaseFormComponent formConfig={getServiceHistorySearchConfig()} values={searchQuery} handlers={searchHandlers} />
      <BaseTableComponent
        tableConfig={getServiceHistoryColumns()}
        reducer="serviceHistory"
        state="serviceHistoryTable"
        title={t("SERVICE_HISTORY_PAGE_HEADER")}
        extra={
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            {t("SERVICE_HISTORY_BTN_ADD")}
          </Button>
        }
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? t("SERVICE_HISTORY_DRAWER_DETAIL") : t("SERVICE_HISTORY_BTN_ADD")}
        onClose={closeDrawer}
      >
        <BaseFormComponent
          formConfig={getServiceHistoryFormConfig()}
          validationSchema={serviceHistoryValidation}
          options={{ contactTypeOptions }}
          values={formValues}
          onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
          handlers={formHandlers}
        />
      </BaseDrawer>
    </Box>
  );
};

export default ServiceHistoryPage;
