import MainLayout from "../layouts/MainLayout";

import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/home/Home";
import Biodatas from "../pages/biodatas/Biodatas";
import AboutUs from "../pages/about-us/AboutUs";
import ContactUs from "../pages/contact-us/ContactUs";
import ErrorPages from "../pages/error/ErrorPages";
import Dashboard from "../layouts/Dashboard";
import Login from "../pages/auth/login";
import Registration from "../pages/auth/Registration";
import PrivateRoute from "../provider/PrivateRoute";
import EditBiodata from "../pages/dashboard/users/EditBiodata";
import ViewBiodata from "../pages/dashboard/users/ViewBiodata";
import MyContactRequest from "../pages/dashboard/users/MyContactRequest";
import FavouriteBiodata from "../pages/dashboard/users/FavouriteBiodata";
import AdminRoutes from "../provider/AdminRoutes";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ApprovedPremium from "../pages/dashboard/admin/ApprovedPremium";
import ApprovedContactRequest from "../pages/dashboard/admin/ApprovedContactRequest";
import ViewBiodatas from "../pages/biodatas/ViewBiodatas";
// import useIsAdmin from "../hooks/useIsAdmin";
// const isAdmin = useIsAdmin();
export const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPages></ErrorPages>,
        children: [
            {
                path: "/",
                element: <Navigate to="/home"></Navigate>
            },
            {
                path: "/home",
                element: <Home></Home>
            },
            {
                path: "/biodatas",
                element: <Biodatas></Biodatas>
            },
            {
                path: "/about-us",
                element: <AboutUs></AboutUs>
            },
            {
                path: "/contact-us",
                element: <ContactUs></ContactUs>
            },
            {
                path: "/dashboard",
                element: <Dashboard></Dashboard>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Registration></Registration>
            },
            {
                path: "/biodatas/:biodataId",
                element: <PrivateRoute><ViewBiodatas></ViewBiodatas></PrivateRoute>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: "/dashboard/edit-biodata",
                element: <EditBiodata></EditBiodata>
            },
            {
                path: "/dashboard/view-biodata",
                element: <ViewBiodata></ViewBiodata>
            },
            {
                path: "/dashboard/my-contact-request",
                element: <MyContactRequest></MyContactRequest>
            },
            {
                path: "/dashboard/favourites-biodata",
                element: <FavouriteBiodata></FavouriteBiodata>
            },
            {
                path: "/dashboard/admin-dashboard",
                element: <AdminRoutes><AdminDashboard></AdminDashboard></AdminRoutes>
            },
            {
                path: "/dashboard/manage-users",
                element: <AdminRoutes><ManageUsers></ManageUsers></AdminRoutes>
            },
            {
                path: "/dashboard/approved-premium",
                element: <AdminRoutes><ApprovedPremium></ApprovedPremium></AdminRoutes>
            },
            {
                path: "/dashboard/approved-contact-request",
                element: <AdminRoutes><ApprovedContactRequest></ApprovedContactRequest></AdminRoutes>
            },
        ]
    }
])