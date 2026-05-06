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
          {t("PAGE_HEADER_TEST_DRIVES")}
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          {t("BTN_REGISTER_TEST_DRIVE")}
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
        title={editId ? t("DRAWER_DETAIL_TEST_DRIVE") : t("BTN_REGISTER_TEST_DRIVE")}
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
