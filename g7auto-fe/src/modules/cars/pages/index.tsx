import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import { carColumns, carFormConfig, carSearchConfig } from "./cars.config";
import { carValidation } from "./cars.validation";
import { BTN_SUBMIT } from "@/libs/constants/button.constant";
import { carStatusOptions } from "@/libs/constants/options.constant";
import { useCars } from "./use-cars";

const CarsPage = () => {
  const {
    drawerOpen, editId, formValues, page,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers,
    setFormValues, setPage,
  } = useCars();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight={700} className="page-title">
          Quản lý Kho xe
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          Thêm xe
        </Button>
      </Box>
      <BaseFormComponent formConfig={carSearchConfig} options={{ carStatusOptions }} handlers={searchHandlers} />
      <BaseTableComponent
        tableConfig={carColumns}
        reducer="cars"
        state="carTable"
        handleCellAction={handleCellAction}
        handlePageChange={(_, p) => setPage(p)}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? "Chỉnh sửa xe" : "Thêm xe"}
        onClose={closeDrawer}
      >
        <BaseFormComponent
          formConfig={carFormConfig}
          validationSchema={carValidation}
          values={formValues}
          options={{ carStatusOptions }}
          onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
          handlers={formHandlers}
        />
      </BaseDrawer>
    </Box>
  );
};

export default CarsPage;
