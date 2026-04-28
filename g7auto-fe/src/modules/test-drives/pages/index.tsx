import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import {
  testDriveColumns,
  testDrivesFormConfig,
  testDriveSearchConfig,
} from "./test-drives.config";
import { testDrivesValidation } from "./test-drives.validation";
import { testDriveStatusOptions } from "@/libs/constants/options.constant";
import { useTestDrives } from "./use-test-drives";

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight={700} className="page-title">
          Quản lý Lái thử
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreate}
        >
          Đăng ký lái thử
        </Button>
      </Box>
      <BaseFormComponent
        formConfig={testDriveSearchConfig}
        options={{ testDriveStatusOptions }}
        handlers={searchHandlers}
      />
      <BaseTableComponent
        tableConfig={testDriveColumns}
        reducer="testDrives"
        state="testDriveTable"
        handleCellAction={handleCellAction}
        handlePageChange={(_, p) => setPage(p)}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? "Chi tiết lái thử" : "Đăng ký lái thử"}
        onClose={closeDrawer}
      >
        <BaseFormComponent
          formConfig={testDrivesFormConfig}
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
