// routes/index.ts
import LazyLoader from "@/components/LazyLoader";

const authProtectedRoutes = [
  { path: "/", component: LazyLoader(() => import("@/pages/productList")) },
  { path: "/product/:id", component: LazyLoader(() => import("@/pages/productDetail")) },
];

const publicRoutes = [
  {
    path: "/login",
    component: LazyLoader(() => import("@/pages/login")),
  },
];

export { authProtectedRoutes, publicRoutes };
