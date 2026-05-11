import { Box, Typography, Divider } from "@mui/material";

interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  bankId?: SelectOption | string | null;
  bankAccountNo?: string;
  bankContent?: string;
  amount?: number | string;
}

const BankTransferQR = ({
  bankId,
  bankAccountNo,
  bankContent,
  amount,
}: Props) => {
  const bankCode = typeof bankId === "object" ? bankId?.value : bankId;
  const bankLabel = typeof bankId === "object" ? bankId?.label : bankId;

  if (!bankCode || !bankAccountNo) return null;

  const params = new URLSearchParams();
  if (amount) params.set("amount", String(amount));
  if (bankContent) params.set("addInfo", bankContent);

  const qrUrl = `https://img.vietqr.io/image/${bankCode}-${bankAccountNo}-compact2.png?${params.toString()}`;

  return (
    <Box
      sx={{
        textAlign: "center",
        my: 2,
        p: 2,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        bgcolor: "#fafafa",
      }}
    >
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Quét mã QR để chuyển khoản
      </Typography>
      <Box
        component="img"
        src={qrUrl}
        alt="QR chuyển khoản"
        sx={{ width: 220, height: 220, mx: "auto", display: "block" }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      <Divider sx={{ my: 1 }} />
      <Typography variant="body2">
        <strong>Ngân hàng:</strong> {bankLabel}
      </Typography>
      <Typography variant="body2">
        <strong>Số tài khoản:</strong> {bankAccountNo}
      </Typography>
      {bankContent && (
        <Typography variant="body2">
          <strong>Nội dung:</strong> {bankContent}
        </Typography>
      )}
      {amount && (
        <Typography variant="body2" color="primary">
          <strong>Số tiền:</strong> {Number(amount).toLocaleString("vi-VN")} VNĐ
        </Typography>
      )}
    </Box>
  );
};

export default BankTransferQR;
