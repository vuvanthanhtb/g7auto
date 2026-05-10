import { Button } from "@mui/material";
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
  yearOptions,
  initCarModelSearchForm,
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
    searchQuery,
    openCreate,
    closeDrawer,
    handleCellAction,
    searchHandlers,
    formHandlers,
    setFormValues,
    handlePageChange,
  } = useCarModels();

  return (
    <>
      <BaseFormComponent<CarModelSearchForm>
        formConfig={getCarModelSearchConfig()}
        options={{ yearOptions }}
        values={searchQuery}
        handlers={searchHandlers}
      />
      <BaseTableComponent
        tableConfig={getCarModelColumns()}
        reducer="carModels"
        state="carModelTable"
        title={t("CAR_MODELS_PAGE_HEADER")}
        extra={
          <div style={{ display: "flex", gap: 8 }}>
            <ImportButton
              onImport={(file) =>
                carModelsService.importFile(file).then((r) => r?.data)
              }
              onDownloadTemplate={() => carModelsService.downloadTemplate()}
              onSuccess={() => dispatch(getCarModels(initCarModelSearchForm))}
            />
            <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
              {t("COMMON_BTN_ADD_NEW")}
            </Button>
          </div>
        }
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? t("CAR_MODELS_DRAWER_EDIT") : t("CAR_MODELS_DRAWER_ADD")}
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
    </>
  );
};

export default CarModelsPage;
