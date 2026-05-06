import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { t } from "@/libs/i18n";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  actions?: React.ReactNode;
}

const BaseModalComponent: React.FC<Props> = ({
  open,
  onClose,
  title,
  children,
  maxWidth = "sm",
  actions,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth>
      {title && (
        <>
          <DialogTitle>
            <Typography fontWeight={600} fontSize={16}>
              {t(title)}
            </Typography>
          </DialogTitle>
          <Divider />
        </>
      )}
      <DialogContent>{children}</DialogContent>
      {actions && (
        <>
          <Divider />
          <DialogActions sx={{ px: 3, py: 1.5, gap: 1 }}>
            {actions}
            <Button
              variant="outlined"
              size="small"
              onClick={onClose}
              sx={{ textTransform: "none" }}
            >
              {t("COMMON_BTN_CLOSE")}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default BaseModalComponent;
