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
import {
  testDrivesValidation,
  testDrivesDetailValidation,
} from "./test-drives.validation";
import { testDriveStatusOptions } from "@/libs/constants/options.constant";
import { useTestDrives } from "./use-test-drives";
import { t } from "@/libs/i18n";
import type {
  TestDriveSearchForm,
  TestDriveCreateFormValues,
  TestDriveDetailFormValues,
} from "../shell/test-drives.type";

const TestDrivesPage = () => {
  const {
    drawerOpen,
    editId,
    createFormValues,
    detailFormValues,
    searchQuery,
    customerOptions,
    carOptions,
    showroomOptions,
    employeeOptions,
    openCreate,
    closeDrawer,
    handleCellAction,
    searchHandlers,
    createHandlers,
    detailHandlers,
    setCreateFormValues,
    setDetailFormValues,
    handlePageChange,
  } = useTestDrives();

  return (
    <Box sx={{ p: 3 }}>
      <BaseFormComponent<TestDriveSearchForm>
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
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreate}
          >
            {t("TEST_DRIVES_BTN_REGISTER")}
          </Button>
        }
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
      />
      <BaseDrawer
        open={drawerOpen}
        title={
          editId
            ? t("TEST_DRIVES_DRAWER_DETAIL")
            : t("TEST_DRIVES_BTN_REGISTER")
        }
        onClose={closeDrawer}
      >
        {editId ? (
          <BaseFormComponent<TestDriveDetailFormValues>
            formConfig={getTestDrivesDetailFormConfig()}
            validationSchema={testDrivesDetailValidation}
            values={detailFormValues}
            onChange={setDetailFormValues}
            handlers={detailHandlers}
          />
        ) : (
          <BaseFormComponent<TestDriveCreateFormValues>
            formConfig={getTestDrivesFormConfig()}
            validationSchema={testDrivesValidation}
            options={{ customerOptions, carOptions, showroomOptions, employeeOptions }}
            values={createFormValues}
            onChange={setCreateFormValues}
            handlers={createHandlers}
          />
        )}
      </BaseDrawer>
    </Box>
  );
};

export default TestDrivesPage;
