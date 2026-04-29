import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDrawer from "@/modules/profile/components/profile-drawer";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import { logoutUser } from "@/modules/auth/shell/auth.slice";
import { AUTH_PATH } from "@/modules/auth/shell/auth.route";
import {
  SUPERADMIN,
  ADMIN,
  DIRECTOR,
  SHOWROOM_MANAGER,
} from "@/libs/constants/roles.constant";

const ROLE_LABEL: Record<
  string,
  { label: string; color: "error" | "warning" | "info" | "success" | "default" }
> = {
  [SUPERADMIN]: { label: "Quản trị viên hệ thống", color: "error" },
  [ADMIN]: { label: "Quản trị viên", color: "warning" },
  [DIRECTOR]: { label: "Giám đốc", color: "info" },
  [SHOWROOM_MANAGER]: { label: "Quản lý showroom", color: "success" },
};

const HeaderComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const roles = useAppSelector((state) => state.auth.roles);

  const primaryRole = [SUPERADMIN, ADMIN, DIRECTOR, SHOWROOM_MANAGER].find(
    (r) => roles.includes(r),
  );
  const roleInfo = primaryRole ? ROLE_LABEL[primaryRole] : null;

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    setAnchor(null);
    await dispatch(logoutUser());
    navigate(AUTH_PATH.LOGIN, { replace: true });
  };

  const displayName = user?.fullName ?? user?.username ?? "User";

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          alignItems: "flex-end",
          lineHeight: 1.2,
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "#3c4043", fontSize: 14, fontWeight: 500 }}
        >
          {displayName}
        </Typography>
        {roleInfo && (
          <Chip
            label={roleInfo.label}
            color={roleInfo.color}
            size="small"
            sx={{
              height: 16,
              fontSize: 10,
              mt: 0.25,
              "& .MuiChip-label": { px: 0.75 },
            }}
          />
        )}
      </Box>

      <Tooltip title="Tài khoản">
        <IconButton size="small" onClick={(e) => setAnchor(e.currentTarget)}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              fontSize: 13,
              bgcolor: "#1a73e8",
              cursor: "pointer",
            }}
          >
            {displayName.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            elevation: 3,
            sx: { mt: 0.5, minWidth: 200, borderRadius: 2 },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {displayName}
          </Typography>
          {user?.email && (
            <Typography variant="caption" color="text.secondary">
              {user.email}
            </Typography>
          )}
        </Box>
        <Divider />
        <MenuItem
          onClick={() => {
            setAnchor(null);
            setProfileOpen(true);
          }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Hồ sơ
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
      <ProfileDrawer open={profileOpen} onClose={() => setProfileOpen(false)} />
    </Box>
  );
};

export default HeaderComponent;
