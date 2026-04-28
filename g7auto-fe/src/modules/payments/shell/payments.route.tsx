import { lazy } from "react";
import PaymentIcon from "@mui/icons-material/Payment";
import type { RouteMeta } from "@/libs/types/route.types";

export const PAYMENTS_PATH = { BASE: "/thanh-toan" };

export const PAYMENTS_CONFIG: RouteMeta[] = [
  {
    key: "payments",
    path: PAYMENTS_PATH.BASE,
    pathOriginal: PAYMENTS_PATH.BASE,
    label: "Thanh toán",
    icon: <PaymentIcon />,
    isAuth: true,
    roles: ["SUPERADMIN", "ADMIN", "DIRECTOR", "SHOWROOM_MANAGER", "ACCOUNTANT"],
    component: lazy(() => import("@/modules/payments/pages")),
  },
];
