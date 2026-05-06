import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import { getCarColumns, getCarFormConfig, getCarSearchConfig } from "./cars.config";
import { carValidation } from "./cars.validation";
import { BTN_SUBMIT } from "@/libs/constants/button.constant";
import { carStatusOptions } from "@/libs/constants/options.constant";
import { useCars } from "./use-cars";
import { t } from "@/libs/i18n";

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
          {t("CARS_PAGE_HEADER")}
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          {t("CARS_BTN_ADD")}
        </Button>
      </Box>
      <BaseFormComponent formConfig={getCarSearchConfig()} options={{ carStatusOptions }} handlers={searchHandlers} />
      <BaseTableComponent
        tableConfig={getCarColumns()}
        reducer="cars"
        state="carTable"
        handleCellAction={handleCellAction}
        handlePageChange={(_, p) => setPage(p)}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? t("CARS_DRAWER_EDIT") : t("CARS_DRAWER_ADD")}
        onClose={closeDrawer}
      >
        <BaseFormComponent
          formConfig={getCarFormConfig()}
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
