import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
        {
            path: '/home',
        },
        {
            path: '/add-transaction',
        },
        {
            path: '/my-transaction',
        },
        {
            path: '/reports',
        },
        {
            path: '/login',
        },
        {
            path: '/signup',
        },

    ]
  },
]);