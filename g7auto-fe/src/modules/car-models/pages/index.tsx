import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import ImportButton from "@/libs/components/ui/import-button";
import { carModelsService } from "../shell/car-model.service";
import { useAppDispatch } from "@/shell/redux/hooks";
import { getCarModels } from "../shell/car-models.slice";
import { carModelColumns, carModelFormConfig, carModelSearchConfig } from "./car-models.config";
import { carModelValidation } from "./car-models.validation";
import { BTN_SUBMIT } from "@/libs/constants/button.constant";
import { useCarModels } from "./use-car-models";

const CarModelsPage = () => {
  const dispatch = useAppDispatch();
  const {
    drawerOpen, editId, formValues, page,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers,
    setFormValues, setPage,
  } = useCarModels();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight={700} className="page-title">
          Quản lý Dòng xe
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <ImportButton
            onImport={(file) => carModelsService.importFile(file).then((r) => r?.data)}
            onDownloadTemplate={() => carModelsService.downloadTemplate()}
            onSuccess={() => dispatch(getCarModels({ page, size: 10 }))}
          />
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            Thêm mới
          </Button>
        </Box>
      </Box>
      <BaseFormComponent formConfig={carModelSearchConfig} handlers={searchHandlers} />
      <BaseTableComponent
        tableConfig={carModelColumns}
        reducer="carModels"
        state="carModelTable"
        handleCellAction={handleCellAction}
        handlePageChange={(_, p) => setPage(p)}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? "Chỉnh sửa dòng xe" : "Thêm dòng xe"}
        onClose={closeDrawer}
      >
        <BaseFormComponent
          formConfig={carModelFormConfig}
          validationSchema={carModelValidation}
          values={formValues}
          onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
          handlers={formHandlers}
        />
      </BaseDrawer>
    </Box>
  );
};

export default CarModelsPage;
