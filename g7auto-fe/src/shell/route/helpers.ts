import type { RouteConfig } from "@/libs/types/route.types";

export const flattenRoutes = (routes: RouteConfig[]): RouteConfig[] =>
  routes.reduce<RouteConfig[]>((acc, r) => {
    acc.push(r);
    if (r.children) acc.push(...flattenRoutes(r.children));
    return acc;
  }, []);
