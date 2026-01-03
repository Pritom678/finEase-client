import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import AddTransaction from "../pages/AddTransaction/AddTransaction";
import MyTransaction from "../pages/MyTransaction/MyTransaction";
import Reports from "../pages/Reports/Reports";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/Register";
import UpdateTransaction from "../pages/UpdateTransaction/UpdateTransaction";
import DetailTransaction from "../pages/DetailTransaction/DetailTransaction";
import PrivateRoute from "./PrivateRoutes";
import Profile from "../pages/Profile/Profile";
import ErrorPage from "../ErrorPage/ErrorPage";
import DashboardLayout from "../layout/DashboardLayout";
import Overview from "../Components/Overview";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Services from "../pages/Services/Services";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contacts",
        element: <Contact />,
      },
      {
        path: "/service",
        element: <Services />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "/dashboard/add-transaction",
        element: (
          <PrivateRoute>
            <AddTransaction />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-transaction",
        element: (
          <PrivateRoute>
            <MyTransaction />
          </PrivateRoute>
        ),
        // loader: () => fetch("https://fin-ease-server-jet.vercel.app/transactions"),
      },
      {
        path: "/dashboard/reports",
        element: (
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/update-transaction/:id",
        element: (
          <PrivateRoute>
            <UpdateTransaction />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/detail-transaction/:id",
        element: (
          <PrivateRoute>
            <DetailTransaction />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
