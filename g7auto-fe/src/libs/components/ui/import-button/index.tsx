import { useRef, useState } from "react";
import { Box, Button, CircularProgress, Tooltip } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import { toastError, toastSuccess } from "@/libs/custom-toast";

type ImportResult = {
  total: number;
  success: number;
  failed: number;
  errors: string[];
};

type Props = {
  onImport: (file: File) => Promise<ImportResult | undefined>;
  onDownloadTemplate: () => void;
  onSuccess?: () => void;
};

const ImportButton = ({ onImport, onDownloadTemplate, onSuccess }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setLoading(true);
    try {
      const result = await onImport(file);
      if (result) {
        toastSuccess(`Import thành công ${result.success}/${result.total} bản ghi`);
        if (result.failed > 0) {
          result.errors.slice(0, 5).forEach((err) => toastError(err));
        }
        onSuccess?.();
      }
    } catch {
      toastError("Import thất bại, kiểm tra lại file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Tooltip title="Tải file mẫu">
        <Button
          variant="outlined"
          size="small"
          startIcon={<DownloadIcon />}
          onClick={onDownloadTemplate}
        >
          Mẫu Excel
        </Button>
      </Tooltip>
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Button
        variant="outlined"
        size="small"
        color="success"
        startIcon={loading ? <CircularProgress size={14} /> : <UploadFileIcon />}
        onClick={() => inputRef.current?.click()}
        disabled={loading}
      >
        Import Excel
      </Button>
    </Box>
  );
};

export default ImportButton;
