import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import ImportButton from "@/libs/components/ui/import-button";
import { carModelsService } from "../shell/car-model.service";
import { useAppDispatch } from "@/shell/redux/hooks";
import { getCarModels } from "../shell/car-models.slice";
import {
  getCarModelColumns,
  getCarModelFormConfig,
  getCarModelSearchConfig,
} from "./car-models.config";
import { carModelValidation } from "./car-models.validation";
import { useCarModels } from "./use-car-models";
import type { CarModelSearchForm } from "../shell/car-model.type";
import { t } from "@/libs/i18n";

const CarModelsPage = () => {
  const dispatch = useAppDispatch();
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
    handlePageChange,
    handleFormChange,
  } = useCarModels();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight={700} className="page-title">
          {t("PAGE_HEADER_CAR_MODELS")}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <ImportButton
            onImport={(file) =>
              carModelsService.importFile(file).then((r) => r?.data)
            }
            onDownloadTemplate={() => carModelsService.downloadTemplate()}
            onSuccess={() => dispatch(getCarModels({ page: 1, size: 10 }))}
          />
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            {t("BTN_ADD_NEW")}
          </Button>
        </Box>
      </Box>
      <BaseFormComponent<CarModelSearchForm>
        formConfig={getCarModelSearchConfig()}
        handlers={searchHandlers}
        onChange={handleFormChange}
      />
      <BaseTableComponent
        tableConfig={getCarModelColumns()}
        reducer="carModels"
        state="carModelTable"
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? t("DRAWER_EDIT_CAR_MODEL") : t("DRAWER_ADD_CAR_MODEL")}
        onClose={closeDrawer}
      >
        <BaseFormComponent
          formConfig={getCarModelFormConfig()}
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
