import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import ImportButton from "@/libs/components/ui/import-button";
import { showroomsService } from "../shell/showroom.service";
import { useAppDispatch } from "@/shell/redux/hooks";
import { getAllShowrooms } from "../shell/showrooms.slice";
import {
  showroomColumns,
  showroomFormConfig,
  showroomSearchConfig,
} from "./showrooms.config";
import { showroomValidation } from "./showrooms.validation";
import { useShowrooms } from "./use-showrooms";

const ShowroomsPage = () => {
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
    setPage,
  } = useShowrooms();

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight={700} className="page-title">
          Quản lý Showroom
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <ImportButton
            onImport={(file) =>
              showroomsService.importFile(file).then((r) => r?.data)
            }
            onDownloadTemplate={() => showroomsService.downloadTemplate()}
            onSuccess={() => dispatch(getAllShowrooms())}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreate}
          >
            Thêm mới
          </Button>
        </Box>
      </Box>
      <BaseFormComponent
        formConfig={showroomSearchConfig}
        handlers={searchHandlers}
      />
      <BaseTableComponent
        tableConfig={showroomColumns}
        reducer="showrooms"
        state="showroomTable"
        handleCellAction={handleCellAction}
        handlePageChange={(_, p) => setPage(p)}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? "Chỉnh sửa showroom" : "Thêm showroom"}
        onClose={closeDrawer}
      >
        <BaseFormComponent
          formConfig={showroomFormConfig}
          validationSchema={showroomValidation}
          values={formValues}
          onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
          handlers={formHandlers}
        />
      </BaseDrawer>
    </Box>
  );
};

export default ShowroomsPage;
