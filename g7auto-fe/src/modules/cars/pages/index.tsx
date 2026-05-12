import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ArticleIcon from "@mui/icons-material/Article";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import {
  getCarColumns,
  getCarCreateFormConfig,
  getCarEditFormConfig,
  getCarSearchConfig,
} from "./cars.config";
import { carCreateValidation, carEditValidation } from "./cars.validation";
import { carStatusOptions } from "@/libs/constants/options.constant";
import { useCars } from "./use-cars";
import { t } from "@/libs/i18n";

const CarsPage = () => {
  const {
    drawerOpen,
    editId,
    formValues,
    searchQuery,
    showroomOptions,
    carModelOptions,
    openCreate,
    closeDrawer,
    handleCellAction,
    searchHandlers,
    formHandlers,
    setFormValues,
    handlePageChange,
    importInputRef,
    handleImportFile,
    handleImport,
    handleTemplate,
  } = useCars();

  return (
    <Box sx={{ p: 3 }}>
      <input
        ref={importInputRef}
        type="file"
        accept=".xlsx,.xls"
        style={{ display: "none" }}
        onChange={handleImportFile}
      />
      <BaseFormComponent
        formConfig={getCarSearchConfig()}
        options={{ carStatusOptions, showroomOptions, carModelOptions }}
        values={searchQuery}
        handlers={searchHandlers}
      />
      <BaseTableComponent
        tableConfig={getCarColumns()}
        reducer="cars"
        state="carTable"
        title={t("CARS_PAGE_HEADER")}
        extra={
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<ArticleIcon />}
              onClick={handleTemplate}
            >
              {t("CARS_BTN_TEMPLATE")}
            </Button>
            <Button
              variant="outlined"
              startIcon={<UploadFileIcon />}
              onClick={handleImport}
            >
              {t("CARS_BTN_IMPORT")}
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={openCreate}
            >
              {t("CARS_BTN_ADD")}
            </Button>
          </Box>
        }
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? t("CARS_DRAWER_EDIT") : t("CARS_DRAWER_ADD")}
        onClose={closeDrawer}
      >
        <BaseFormComponent
          formConfig={
            editId ? getCarEditFormConfig() : getCarCreateFormConfig()
          }
          validationSchema={editId ? carEditValidation : carCreateValidation}
          values={formValues}
          options={{ carStatusOptions, showroomOptions, carModelOptions }}
          onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
          handlers={formHandlers}
        />
      </BaseDrawer>
    </Box>
  );
};

export default CarsPage;
