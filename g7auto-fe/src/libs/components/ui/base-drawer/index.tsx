import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { t } from "@/libs/i18n";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  anchor?: "top" | "left" | "bottom" | "right";
  width?: number | string;
  children: React.ReactNode;
}

const BaseDrawerComponent: React.FC<Props> = ({
  open,
  onClose,
  title,
  anchor = "right",
  width = 520,
  children,
}) => {
  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={(_, reason) => {
        if (reason === "backdropClick") return;
        onClose();
      }}
      sx={{ zIndex: (theme) => theme.zIndex.modal }}
      slotProps={{
        paper: { sx: { width, display: "flex", flexDirection: "column" } },
      }}
    >
      {title && (
        <>
          <Box
            sx={{
              px: 3,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography fontWeight={600} fontSize={16}>
              {t(title)}
            </Typography>
            <IconButton size="small" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Divider />
        </>
      )}
      <Box sx={{ flex: 1, overflowY: "auto", px: 3, py: 2 }}>{children}</Box>
    </Drawer>
  );
};

export default BaseDrawerComponent;
