import { lazy } from "react";
import HandshakeIcon from "@mui/icons-material/Handshake";
import type { RouteMeta } from "@/libs/types/route.types";

export const DEPOSITS_PATH = { BASE: "/dat-coc" };

export const DEPOSITS_CONFIG: RouteMeta[] = [
  {
    key: "deposits",
    path: DEPOSITS_PATH.BASE,
    pathOriginal: DEPOSITS_PATH.BASE,
    label: "Đặt cọc",
    icon: <HandshakeIcon />,
    isAuth: true,
    roles: ["SUPERADMIN", "ADMIN", "DIRECTOR", "SHOWROOM_MANAGER", "SALES", "ACCOUNTANT"],
    component: lazy(() => import("@/modules/deposits/pages")),
  },
];
