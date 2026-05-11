import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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
    openCreate,
    closeDrawer,
    handleCellAction,
    searchHandlers,
    formHandlers,
    setFormValues,
    handlePageChange,
    importInputRef,
    handleImportFile,
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
        options={{ carStatusOptions }}
        values={searchQuery}
        handlers={searchHandlers}
      />
      <BaseTableComponent
        tableConfig={getCarColumns()}
        reducer="cars"
        state="carTable"
        title={t("CARS_PAGE_HEADER")}
        extra={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreate}
          >
            {t("CARS_BTN_ADD")}
          </Button>
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
          options={{ carStatusOptions }}
          onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
          handlers={formHandlers}
        />
      </BaseDrawer>
    </Box>
  );
};

export default CarsPage;
