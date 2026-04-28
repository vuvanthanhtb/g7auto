import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import { quotationColumns, quotationsFormConfig, quotationSearchConfig } from "./quotations.config";
import { quotationsValidation } from "./quotations.validation";
import { BTN_SUBMIT } from "@/libs/constants/button.constant";
import { quotationStatusOptions } from "@/libs/constants/options.constant";
import { useQuotations } from "./use-quotations";

const QuotationsPage = () => {
  const {
    drawerOpen, editId, formValues, page,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers,
    setFormValues, setPage,
  } = useQuotations();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight={700} className="page-title">
          Quản lý Báo giá
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          Tạo báo giá
        </Button>
      </Box>
      <BaseFormComponent formConfig={quotationSearchConfig} options={{ quotationStatusOptions }} handlers={searchHandlers} />
      <BaseTableComponent
        tableConfig={quotationColumns}
        reducer="quotations"
        state="quotationTable"
        handleCellAction={handleCellAction}
        handlePageChange={(_, p) => setPage(p)}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? "Chi tiết báo giá" : "Tạo báo giá"}
        onClose={closeDrawer}
      >
        <BaseFormComponent
          formConfig={quotationsFormConfig}
          validationSchema={quotationsValidation}
          values={formValues}
          onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
          handlers={formHandlers}
        />
      </BaseDrawer>
    </Box>
  );
};

export default QuotationsPage;
