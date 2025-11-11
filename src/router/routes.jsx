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
        path: "/add-transaction",
        element: (
          <PrivateRoute>
            <AddTransaction />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-transaction",
        element: (
          <PrivateRoute>
            <MyTransaction />
          </PrivateRoute>
        ),
        // loader: () => fetch("https://fin-ease-server-jet.vercel.app/transactions"),
      },
      {
        path: "/reports",
        element: (
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-transaction/:id",
        element: (
          <PrivateRoute>
            <UpdateTransaction />
          </PrivateRoute>
        ),
      },
      {
        path: "/detail-transaction/:id",
        element: (
          <PrivateRoute>
            <DetailTransaction />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
