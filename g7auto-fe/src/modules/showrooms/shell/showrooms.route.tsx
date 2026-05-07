import { lazy } from "react";
import StoreIcon from "@mui/icons-material/Store";
import type { RouteMeta } from "@/libs/types/route.types";

export const SHOWROOMS_PATH = { BASE: "/showroom" };

export const SHOWROOMS_CONFIG: RouteMeta[] = [
  {
    key: "showrooms",
    path: SHOWROOMS_PATH.BASE,
    pathOriginal: SHOWROOMS_PATH.BASE,
    label: "MENU_SHOWROOMS",
    icon: <StoreIcon />,
    isAuth: true,
    roles: ["SUPERADMIN", "ADMIN", "DIRECTOR"],
    component: lazy(() => import("@/modules/showrooms/pages")),
  },
];
