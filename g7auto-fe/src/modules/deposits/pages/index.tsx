import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import { depositColumns, depositsFormConfig, depositSearchConfig } from "./deposits.config";
import { depositsValidation } from "./deposits.validation";
import { BTN_SUBMIT } from "@/libs/constants/button.constant";
import { depositStatusOptions } from "@/libs/constants/options.constant";
import { useDeposits } from "./use-deposits";

const DepositsPage = () => {
  const {
    drawerOpen, editId, formValues, page,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers,
    setFormValues, setPage,
  } = useDeposits();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight={700} className="page-title">
          Quản lý Đặt cọc
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          Tạo đặt cọc
        </Button>
      </Box>
      <BaseFormComponent formConfig={depositSearchConfig} options={{ depositStatusOptions }} handlers={searchHandlers} />
      <BaseTableComponent
        tableConfig={depositColumns}
        reducer="deposits"
        state="depositTable"
        handleCellAction={handleCellAction}
        handlePageChange={(_, p) => setPage(p)}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? "Chi tiết đặt cọc" : "Tạo đặt cọc"}
        onClose={closeDrawer}
      >
        <BaseFormComponent
          formConfig={depositsFormConfig}
          validationSchema={depositsValidation}
          values={formValues}
          onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
          handlers={formHandlers}
        />
      </BaseDrawer>
    </Box>
  );
};

export default DepositsPage;
