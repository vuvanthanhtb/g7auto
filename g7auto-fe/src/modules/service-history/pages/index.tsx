import { Box, Button, Stack, Typography } from "@mui/material";
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
import type {
  ServiceHistoryFormValues,
  ServiceHistorySearchForm,
} from "../shell/service-history.type";
import { formatDateTime } from "@/libs/utils";

const ServiceHistoryPage = () => {
  const {
    drawerOpen,
    createOpen,
    selected,
    formValues,
    searchQuery,
    customerOptions,
    employeeOptions,
    openCreate,
    closeCreate,
    closeDetail,
    handleCellAction,
    searchHandlers,
    formHandlers,
    setFormValues,
    handlePageChange,
  } = useServiceHistory();

  return (
    <Box sx={{ p: 3 }}>
      <BaseFormComponent<ServiceHistorySearchForm>
        formConfig={getServiceHistorySearchConfig()}
        values={searchQuery}
        handlers={searchHandlers}
      />
      <BaseTableComponent
        tableConfig={getServiceHistoryColumns()}
        reducer="serviceHistory"
        state="serviceHistoryTable"
        title={t("SERVICE_HISTORY_PAGE_HEADER")}
        extra={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreate}
          >
            {t("SERVICE_HISTORY_BTN_ADD")}
          </Button>
        }
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
      />

      {/* Detail drawer */}
      <BaseDrawer
        open={drawerOpen}
        title={t("SERVICE_HISTORY_DRAWER_DETAIL")}
        onClose={closeDetail}
      >
        {selected && (
          <Box sx={{ p: 1 }}>
            <Stack spacing={1.5}>
              {(
                [
                  ["COMMON_LABEL_CUSTOMER", selected.customerFullName],
                  ["CONTRACTS_FIELD_EMPLOYEE_ID", selected.employeeCode ? `${selected.employeeCode} — ${selected.employeeFullName}` : selected.employeeFullName],
                  ["SERVICE_HISTORY_FIELD_CONTACT_TYPE", selected.contactType],
                  [
                    "SERVICE_HISTORY_FIELD_DATE",
                    formatDateTime(selected.serviceDate),
                  ],
                  ["SERVICE_HISTORY_FIELD_CONTENT", selected.content],
                  ["SERVICE_HISTORY_FIELD_RESULT", selected.result],
                  [
                    "SERVICE_HISTORY_FIELD_NEXT_REMINDER",
                    formatDateTime(selected.nextReminderDate),
                  ],
                  ["COMMON_LABEL_CREATED_AT", selected.createdAt],
                ] as [string, string][]
              )
                .filter(([, v]) => v)
                .map(([label, value]) => (
                  <Box
                    key={label}
                    sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ minWidth: 160 }}
                    >
                      {t(label)}:
                    </Typography>
                    <Typography variant="body2">{value}</Typography>
                  </Box>
                ))}
            </Stack>
          </Box>
        )}
      </BaseDrawer>

      {/* Create drawer */}
      <BaseDrawer
        open={createOpen}
        title={t("SERVICE_HISTORY_BTN_ADD")}
        onClose={closeCreate}
      >
        <BaseFormComponent<ServiceHistoryFormValues>
          formConfig={getServiceHistoryFormConfig()}
          validationSchema={serviceHistoryValidation}
          options={{ contactTypeOptions, customerOptions, employeeOptions }}
          values={formValues}
          onChange={setFormValues}
          handlers={formHandlers}
        />
      </BaseDrawer>
    </Box>
  );
};

export default ServiceHistoryPage;
