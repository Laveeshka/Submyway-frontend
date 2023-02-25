import { Navigate, useRoutes } from "react-router-dom"
// layouts
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Subscriptions from "../pages/Subscriptions";
import Companies from "../pages/Companies";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound404 from "../pages/NotFound404";
import CreateSub from "../subpages/CreateSub";
import EditSub from "../subpages/EditSub";
import CreateCompany from "../subpages/CreateCompany";
import EditCompany from "../subpages/EditCompany";
import Categories from "../pages/Categories";
import CreateCategory from "../subpages/CreateCategory";
import EditCategory from "../subpages/EditCategory";

// ----------------------------------------------------------------------

export default function Router() {
    const routes = useRoutes([
        {
            path: '/',
            element: <DashboardLayout />,
            children: [
                {element: <Navigate to="dashboard" />, index: true},
                {path: "dashboard", element: <Dashboard />},
                {path: "subscriptions", children: [
                    {element: <Subscriptions/>, index: true},
                    {path: "create", element: <CreateSub />},
                    {path: "edit/:id", element: <EditSub />}
                ]},
                {path: "companies", children: [
                    {element: <Companies />, index: true},
                    {path: "create", element: <CreateCompany />},
                    {path: "edit/:companyId", element: <EditCompany />}
                ]},
                {path: "categories", children: [
                    {element: <Categories />, index: true},
                    {path: "create", element: <CreateCategory />},
                    {path: "edit/:categoryId", element: <EditCategory />}
                ]}
            ]
        },
        {path: '/login', element: <Login />},
        {path: '/register', element: <Register />},
        {path: '*', element: <NotFound404 />}
    ]);

    return routes;
}