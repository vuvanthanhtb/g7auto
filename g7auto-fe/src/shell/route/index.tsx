import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./private.route";
import LoadingPage from "@/libs/pages/loading";
import NotFoundPage from "@/libs/pages/not-found";
import MainLayout from "@/libs/components/layout";
import { AUTH_CONFIG } from "@/modules/auth/shell/auth.route";
import { PATHS_CONFIG } from "./path.config";

const wrap = (Component: React.LazyExoticComponent<React.ComponentType>) => (
  <Suspense fallback={<LoadingPage />}><Component /></Suspense>
);

export const router = createBrowserRouter([
  ...AUTH_CONFIG.map((r) => ({ path: r.path, element: wrap(r.component) })),
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <MainLayout />,
        children: PATHS_CONFIG.map((r) => ({ path: r.path, element: wrap(r.component) })),
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
