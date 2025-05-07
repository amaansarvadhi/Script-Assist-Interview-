import useAuthStore from "@/store/slices/authSlice";
import React from "react";
import { LayoutRouteProps, Navigate, useLocation } from "react-router-dom";

interface AuthMiddlewareProps {
  layout?: React.FC<LayoutRouteProps>;
  isAuthProtected: boolean;
  children: React.ReactNode;
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({
  layout: Layout,
  children,
  isAuthProtected,
}) => {
  const { token } = useAuthStore((state) => state);
  const location = useLocation();

  // Redirect to home if user is already authenticated and tries to access the login page
  if (token && location.pathname === "/login") {
    return <Navigate to="/" />;
  }

  // If the route is protected and no token exists, redirect to login
  if (isAuthProtected && !token) {
    return <Navigate to="/login" />;
  }

  return Layout ? <Layout>{children}</Layout> : <>{children}</>;
};

export default AuthMiddleware;
