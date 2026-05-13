import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import ImportButton from "@/libs/components/ui/import-button";
import { useAppDispatch } from "@/shell/redux/hooks";
import { getShowrooms, importShowrooms, downloadShowroomTemplate } from "../shell/showrooms.slice";
import {
  getShowroomColumns,
  getShowroomFormConfig,
  getShowroomSearchConfig,
} from "./showrooms.config";
import { showroomValidation } from "./showrooms.validation";
import { useShowrooms } from "./use-showrooms";
import { t } from "@/libs/i18n";
import type { ShowroomFormValues, ShowroomSearchForm } from "../shell/showroom.type";

const ShowroomsPage = () => {
  const dispatch = useAppDispatch();
  const {
    drawerOpen,
    editId,
    formValues,
    searchQuery,
    employeeOptions,
    openCreate,
    closeDrawer,
    handleCellAction,
    searchHandlers,
    formHandlers,
    setFormValues,
    handlePageChange,
  } = useShowrooms();

  return (
    <>
      <BaseFormComponent<ShowroomSearchForm>
        formConfig={getShowroomSearchConfig()}
        values={searchQuery}
        handlers={searchHandlers}
      />
      <BaseTableComponent
        tableConfig={getShowroomColumns()}
        reducer="showrooms"
        state="showroomTable"
        title={t("SHOWROOMS_PAGE_HEADER")}
        extra={
          <div style={{ display: "flex", gap: 8 }}>
            <ImportButton
              onImport={(file) => dispatch(importShowrooms(file)).unwrap()}
              onDownloadTemplate={() => dispatch(downloadShowroomTemplate())}
              onSuccess={() => dispatch(getShowrooms(searchQuery))}
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
        title={editId ? t("SHOWROOMS_DRAWER_EDIT") : t("SHOWROOMS_DRAWER_ADD")}
        onClose={closeDrawer}
      >
        <BaseFormComponent<ShowroomFormValues>
          formConfig={getShowroomFormConfig()}
          validationSchema={showroomValidation}
          values={formValues}
          options={{ employeeOptions }}
          onChange={setFormValues}
          handlers={formHandlers}
        />
      </BaseDrawer>
    </>
  );
};

export default ShowroomsPage;
