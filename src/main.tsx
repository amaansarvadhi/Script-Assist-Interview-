import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import Layout from "./components/Layout/Layout"; // Import the layout component
import { authProtectedRoutes, publicRoutes } from "./routes";
import "./index.css";
import AuthMiddleware from "./routes/routes";

// Create the router based on routes
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        // Public routes
        ...publicRoutes.map((route) => ({
          path: route.path,
          element: (
            <AuthMiddleware isAuthProtected={false}>
                <route.component />
            </AuthMiddleware>
          ),
        })),
        // Auth-protected routes
        ...authProtectedRoutes.map((route) => ({
          path: route.path,
          element: (
            <AuthMiddleware isAuthProtected={true} layout={Layout}>
                <route.component />
            </AuthMiddleware>
          ),
        })),
        // Fallback route (redirect to login)
        {
          path: "*",
          element: <Navigate to="/login" replace />,
        },
      ],
    },
  ],
);

// Set up React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1, // Retry once before failure
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
      cacheTime: 1000 * 60 * 15, // Keep cache for 15 minutes
    },
  },
});

// Render the app
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
