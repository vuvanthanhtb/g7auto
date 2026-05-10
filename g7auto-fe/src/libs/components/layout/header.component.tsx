import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDrawer from "@/modules/profile/components/profile-drawer";
import {
  Avatar,
  Box,
  Button,
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
  SALES,
  WAREHOUSE,
  ACCOUNTANT,
} from "@/libs/constants/roles.constant";
import { changeLocale } from "@/shell/redux/locale.slice";
import type { Locale } from "@/libs/i18n/types";
import { t } from "@/libs/i18n";

interface RoleInfo {
  label: string;
  bg: string;
  avatarBg: string;
  borderColor: string;
}

const getRoleMap = (): Record<string, RoleInfo> => ({
  [SUPERADMIN]: {
    label: t("COMMON_ROLE_SUPERADMIN"),
    bg: "#c62828",
    avatarBg: "#c62828",
    borderColor: "#ef9a9a",
  },
  [ADMIN]: {
    label: t("COMMON_ROLE_ADMIN"),
    bg: "#e65100",
    avatarBg: "#e65100",
    borderColor: "#ffcc80",
  },
  [DIRECTOR]: {
    label: t("COMMON_ROLE_DIRECTOR"),
    bg: "#0277bd",
    avatarBg: "#0277bd",
    borderColor: "#81d4fa",
  },
  [SHOWROOM_MANAGER]: {
    label: t("COMMON_ROLE_SHOWROOM_MANAGER"),
    bg: "#2e7d32",
    avatarBg: "#2e7d32",
    borderColor: "#a5d6a7",
  },
  [SALES]: {
    label: t("COMMON_ROLE_SALES"),
    bg: "#6a1b9a",
    avatarBg: "#6a1b9a",
    borderColor: "#ce93d8",
  },
  [WAREHOUSE]: {
    label: t("COMMON_ROLE_WAREHOUSE"),
    bg: "#00695c",
    avatarBg: "#00695c",
    borderColor: "#80cbc4",
  },
  [ACCOUNTANT]: {
    label: t("COMMON_ROLE_ACCOUNTANT"),
    bg: "#283593",
    avatarBg: "#283593",
    borderColor: "#9fa8da",
  },
});

const ALL_ROLES = [
  SUPERADMIN,
  ADMIN,
  DIRECTOR,
  SHOWROOM_MANAGER,
  SALES,
  WAREHOUSE,
  ACCOUNTANT,
];

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

  const roleMap = getRoleMap();
  const primaryRole = ALL_ROLES.find((r) => roles.includes(r));
  const roleInfo = primaryRole ? roleMap[primaryRole] : null;

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
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      {/* Language selector */}
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
          mr: 1,
          "&:hover": { borderColor: "primary.main", bgcolor: "action.hover" },
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
        slotProps={{ paper: { elevation: 3, sx: { mt: 0.5, minWidth: 140, borderRadius: 2 } } }}
      >
        {LOCALES.map((l) => (
          <MenuItem
            key={l}
            selected={l === locale}
            onClick={() => { dispatch(changeLocale(l)); setLocaleAnchor(null); }}
            sx={{ fontSize: 13, gap: 1 }}
          >
            {LOCALE_FLAGS[l]}&nbsp;{LOCALE_LABELS[l]}
          </MenuItem>
        ))}
      </Menu>

      {/* Name + role (desktop only) */}
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          alignItems: "flex-end",
          lineHeight: 1,
        }}
      >
        <Typography sx={{ color: "#3c4043", fontSize: 13, fontWeight: 600, lineHeight: 1.3, whiteSpace: "nowrap" }}>
          {displayName}
        </Typography>
        {roleInfo && (
          <Box
            sx={{
              mt: 0.3,
              px: 0.75,
              py: 0.1,
              bgcolor: roleInfo.bg,
              borderRadius: "4px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: "9.5px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                lineHeight: 1.6,
                whiteSpace: "nowrap",
              }}
            >
              {roleInfo.label}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Avatar — always on the right */}
      <Tooltip title={t("COMMON_TOOLTIP_ACCOUNT")}>
        <IconButton size="small" onClick={(e) => setAnchor(e.currentTarget)}>
          <Avatar
            sx={{
              width: 34,
              height: 34,
              fontSize: 14,
              fontWeight: 700,
              bgcolor: roleInfo?.avatarBg ?? "#1a73e8",
              border: "2.5px solid",
              borderColor: roleInfo?.borderColor ?? "transparent",
              boxShadow: roleInfo ? `0 0 0 1px ${roleInfo.bg}22` : "none",
            }}
          >
            {displayName.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>

      {/* Dropdown menu */}
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{ paper: { elevation: 4, sx: { mt: 0.5, minWidth: 220, borderRadius: 2 } } }}
      >
        <Box sx={{ px: 2, py: 1.5, display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              fontSize: 16,
              fontWeight: 700,
              bgcolor: roleInfo?.avatarBg ?? "#1a73e8",
              border: "2px solid",
              borderColor: roleInfo?.borderColor ?? "divider",
            }}
          >
            {displayName.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={700} sx={{ lineHeight: 1.3 }}>
              {displayName}
            </Typography>
            {user?.email && (
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", lineHeight: 1.3 }}>
                {user.email}
              </Typography>
            )}
            {roleInfo && (
              <Box
                sx={{
                  mt: 0.5,
                  px: 0.75,
                  py: 0.15,
                  bgcolor: roleInfo.bg,
                  borderRadius: "4px",
                  display: "inline-flex",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    lineHeight: 1.6,
                  }}
                >
                  {roleInfo.label}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Divider />
        <MenuItem
          onClick={() => { setAnchor(null); setProfileOpen(true); }}
          sx={{ gap: 1, py: 1 }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          {t("COMMON_MENU_PROFILE")}
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: "error.main", gap: 1, py: 1 }}>
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
