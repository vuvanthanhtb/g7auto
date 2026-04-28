import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import { employeeColumns, employeeFormConfig, employeeSearchConfig } from "./employees.config";
import { employeeValidation } from "./employees.validation";
import { BTN_SUBMIT } from "@/libs/constants/button.constant";
import { employeeStatusOptions } from "@/libs/constants/options.constant";
import { useEmployees } from "./use-employees";

const EmployeesPage = () => {
  const {
    drawerOpen, editId, formValues, page,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers,
    setFormValues, setPage,
  } = useEmployees();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight={700} className="page-title">
          Quản lý Nhân viên
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          Thêm nhân viên
        </Button>
      </Box>
      <BaseFormComponent formConfig={employeeSearchConfig} options={{ employeeStatusOptions }} handlers={searchHandlers} />
      <BaseTableComponent
        tableConfig={employeeColumns}
        reducer="employees"
        state="employeeTable"
        handleCellAction={handleCellAction}
        handlePageChange={(_, p) => setPage(p)}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? "Chỉnh sửa nhân viên" : "Thêm nhân viên"}
        onClose={closeDrawer}
      >
        <BaseFormComponent
          formConfig={employeeFormConfig}
          validationSchema={employeeValidation}
          values={formValues}
          onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
          handlers={formHandlers}
        />
      </BaseDrawer>
    </Box>
  );
};

export default EmployeesPage;
