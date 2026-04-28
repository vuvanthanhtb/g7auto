import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)", textAlign: "center", p: 2 }}>
      <ErrorOutlineIcon sx={{ fontSize: 120, color: "#f50057", mb: 3 }} />
      <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>404</Typography>
      <Typography variant="h5" sx={{ mb: 4, color: "#333" }}>Trang không tồn tại.</Typography>
      <Button variant="contained" color="primary" size="large" onClick={() => navigate("/")}>
        Quay về trang chủ
      </Button>
    </Box>
  );
};

export default NotFoundPage;
