import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import ImportButton from "@/libs/components/ui/import-button";
import { customersService } from "../shell/customers.service";
import { useAppDispatch } from "@/shell/redux/hooks";
import { getCustomers } from "../shell/customers.slice";
import { customerColumns, customerFormConfig, customerSearchConfig } from "./customers.config";
import { customerValidation } from "./customers.validation";
import { BTN_SUBMIT } from "@/libs/constants/button.constant";
import { useCustomers } from "./use-customers";

const CustomersPage = () => {
  const dispatch = useAppDispatch();
  const {
    drawerOpen, editId, formValues, page,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers,
    setFormValues, setPage,
  } = useCustomers();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight={700} className="page-title">
          Quản lý Khách hàng
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <ImportButton
            onImport={(file) => customersService.importFile(file).then((r) => r?.data)}
            onDownloadTemplate={() => customersService.downloadTemplate()}
            onSuccess={() => dispatch(getCustomers({ page, size: 10 }))}
          />
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            Thêm khách hàng
          </Button>
        </Box>
      </Box>
      <BaseFormComponent formConfig={customerSearchConfig} handlers={searchHandlers} />
      <BaseTableComponent
        tableConfig={customerColumns}
        reducer="customers"
        state="customerTable"
        handleCellAction={handleCellAction}
        handlePageChange={(_, p) => setPage(p)}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? "Chỉnh sửa khách hàng" : "Thêm khách hàng"}
        onClose={closeDrawer}
      >
        <BaseFormComponent
          formConfig={customerFormConfig}
          validationSchema={customerValidation}
          values={formValues}
          onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
          handlers={formHandlers}
        />
      </BaseDrawer>
    </Box>
  );
};

export default CustomersPage;
