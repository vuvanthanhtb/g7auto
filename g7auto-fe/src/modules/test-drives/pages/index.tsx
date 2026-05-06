import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import {
  getTestDriveColumns,
  getTestDrivesFormConfig,
  getTestDriveSearchConfig,
} from "./test-drives.config";
import { testDrivesValidation } from "./test-drives.validation";
import { testDriveStatusOptions } from "@/libs/constants/options.constant";
import { useTestDrives } from "./use-test-drives";
import { t } from "@/libs/i18n";

const TestDrivesPage = () => {
  const {
    drawerOpen,
    editId,
    formValues,
    openCreate,
    closeDrawer,
    handleCellAction,
    searchHandlers,
    formHandlers,
    setFormValues,
    setPage,
  } = useTestDrives();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight={700} className="page-title">
          {t("TEST_DRIVES_PAGE_HEADER")}
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          {t("TEST_DRIVES_BTN_REGISTER")}
        </Button>
      </Box>
      <BaseFormComponent
        formConfig={getTestDriveSearchConfig()}
        options={{ testDriveStatusOptions }}
        handlers={searchHandlers}
      />
      <BaseTableComponent
        tableConfig={getTestDriveColumns()}
        reducer="testDrives"
        state="testDriveTable"
        handleCellAction={handleCellAction}
        handlePageChange={(_, p) => setPage(p)}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? t("TEST_DRIVES_DRAWER_DETAIL") : t("TEST_DRIVES_BTN_REGISTER")}
        onClose={closeDrawer}
      >
        <BaseFormComponent
          formConfig={getTestDrivesFormConfig()}
          validationSchema={testDrivesValidation}
          values={formValues}
          onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
          handlers={formHandlers}
        />
      </BaseDrawer>
    </Box>
  );
};

export default TestDrivesPage;
