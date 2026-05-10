import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import {
  getTestDriveColumns,
  getTestDrivesFormConfig,
  getTestDrivesDetailFormConfig,
  getTestDriveSearchConfig,
} from "./test-drives.config";
import { testDrivesValidation, testDrivesDetailValidation } from "./test-drives.validation";
import { testDriveStatusOptions } from "@/libs/constants/options.constant";
import { useTestDrives } from "./use-test-drives";
import { t } from "@/libs/i18n";

const TestDrivesPage = () => {
  const {
    drawerOpen, editId, formValues, searchQuery,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers, detailHandlers,
    setFormValues, handlePageChange,
  } = useTestDrives();

  return (
    <Box sx={{ p: 3 }}>
      <BaseFormComponent
        formConfig={getTestDriveSearchConfig()}
        options={{ testDriveStatusOptions }}
        values={searchQuery}
        handlers={searchHandlers}
      />
      <BaseTableComponent
        tableConfig={getTestDriveColumns()}
        reducer="testDrives"
        state="testDriveTable"
        title={t("TEST_DRIVES_PAGE_HEADER")}
        extra={
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            {t("TEST_DRIVES_BTN_REGISTER")}
          </Button>
        }
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? t("TEST_DRIVES_DRAWER_DETAIL") : t("TEST_DRIVES_BTN_REGISTER")}
        onClose={closeDrawer}
      >
        {editId ? (
          <BaseFormComponent
            formConfig={getTestDrivesDetailFormConfig()}
            validationSchema={testDrivesDetailValidation}
            values={formValues}
            onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
            handlers={detailHandlers}
          />
        ) : (
          <BaseFormComponent
            formConfig={getTestDrivesFormConfig()}
            validationSchema={testDrivesValidation}
            values={formValues}
            onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
            handlers={formHandlers}
          />
        )}
      </BaseDrawer>
    </Box>
  );
};

export default TestDrivesPage;
