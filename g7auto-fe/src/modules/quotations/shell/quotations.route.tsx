import { lazy } from "react";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import type { RouteMeta } from "@/libs/types/route.types";

export const QUOTATIONS_PATH = { BASE: "/bao-gia" };

export const QUOTATIONS_CONFIG: RouteMeta[] = [
  {
    key: "quotations",
    path: QUOTATIONS_PATH.BASE,
    pathOriginal: QUOTATIONS_PATH.BASE,
    label: "Báo giá",
    icon: <RequestQuoteIcon />,
    isAuth: true,
    roles: ["SUPERADMIN", "ADMIN", "DIRECTOR", "SHOWROOM_MANAGER", "SALES"],
    component: lazy(() => import("@/modules/quotations/pages")),
  },
];
