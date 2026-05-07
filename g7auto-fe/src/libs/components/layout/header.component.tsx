import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDrawer from "@/modules/profile/components/profile-drawer";
import {
  Avatar,
  Box,
  Button,
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
import { changeLocale } from "@/shell/redux/locale.slice";
import type { Locale } from "@/libs/i18n/types";
import { t } from "@/libs/i18n";

const getRoleLabel = (): Record<
  string,
  { label: string; color: "error" | "warning" | "info" | "success" | "default" }
> => ({
  [SUPERADMIN]: { label: t("COMMON_ROLE_SUPERADMIN"), color: "error" },
  [ADMIN]: { label: t("COMMON_ROLE_ADMIN"), color: "warning" },
  [DIRECTOR]: { label: t("COMMON_ROLE_DIRECTOR"), color: "info" },
  [SHOWROOM_MANAGER]: {
    label: t("COMMON_ROLE_SHOWROOM_MANAGER"),
    color: "success",
  },
});

const LOCALE_FLAGS: Record<Locale, string> = {
  vi: "🇻🇳",
  en: "🇬🇧",
  zh: "🇨🇳",
};

const LOCALE_LABELS: Record<Locale, string> = {
  vi: "VI",
  en: "EN",
  zh: "中文",
};

const LOCALES: Locale[] = ["vi", "en", "zh"];

const HeaderComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const roles = useAppSelector((state) => state.auth.roles);
  const locale = useAppSelector((state) => state.locale.locale);

  const ROLE_LABEL = getRoleLabel();
  const primaryRole = [SUPERADMIN, ADMIN, DIRECTOR, SHOWROOM_MANAGER].find(
    (r) => roles.includes(r),
  );
  const roleInfo = primaryRole ? ROLE_LABEL[primaryRole] : null;

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [localeAnchor, setLocaleAnchor] = useState<null | HTMLElement>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    setAnchor(null);
    await dispatch(logoutUser());
    navigate(AUTH_PATH.LOGIN, { replace: true });
  };

  const displayName = user?.fullName ?? user?.username ?? "User";

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Button
        size="small"
        onClick={(e) => setLocaleAnchor(e.currentTarget)}
        sx={{
          minWidth: 44,
          px: 1,
          py: 0.25,
          fontSize: 12,
          fontWeight: 600,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          color: "text.primary",
          "&:hover": { borderColor: "primary.main", bgcolor: "action.hover" },
          marginRight: 10,
        }}
      >
        {LOCALE_FLAGS[locale]}&nbsp;{LOCALE_LABELS[locale]}
      </Button>
      <Menu
        anchorEl={localeAnchor}
        open={Boolean(localeAnchor)}
        onClose={() => setLocaleAnchor(null)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            elevation: 3,
            sx: { mt: 0.5, minWidth: 140, borderRadius: 2 },
          },
        }}
      >
        {LOCALES.map((l) => (
          <MenuItem
            key={l}
            selected={l === locale}
            onClick={() => {
              dispatch(changeLocale(l));
              setLocaleAnchor(null);
            }}
            sx={{ fontSize: 13, gap: 1 }}
          >
            {LOCALE_FLAGS[l]}&nbsp;{LOCALE_LABELS[l]}
          </MenuItem>
        ))}
      </Menu>

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

      <Tooltip title={t("COMMON_TOOLTIP_ACCOUNT")}>
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
          {t("COMMON_MENU_PROFILE")}
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          {t("COMMON_MENU_LOGOUT")}
        </MenuItem>
      </Menu>
      <ProfileDrawer open={profileOpen} onClose={() => setProfileOpen(false)} />
    </Box>
  );
};

export default HeaderComponent;
