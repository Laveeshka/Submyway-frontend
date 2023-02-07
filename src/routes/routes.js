import { Navigate, useRoutes } from "react-router-dom"
// layouts
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import SimpleLayout from "../layout/SimpleLayout";
import Dashboard from "../pages/Dashboard";
import Subscriptions from "../pages/Subscriptions";
import Companies from "../pages/Companies";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound404 from "../pages/NotFound404";

// ----------------------------------------------------------------------

export default function Router() {
    const routes = useRoutes([
        {
            path: '/',
            element: <DashboardLayout />,
            children: [
                {element: <Navigate to="dashboard" />, index: true},
                {path: "dashboard", element: <Dashboard />},
                {path: "subscriptions", element: <Subscriptions />},
                {path: "companies", element: <Companies />}
            ]
        },
        {path: '/login', element: <Login />},
        {path: '/register', element: <Register />},
        {path: '*', element: <NotFound404 />}
    ]);

    return routes;
}