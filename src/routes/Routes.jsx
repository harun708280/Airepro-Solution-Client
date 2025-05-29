import Layout from "@/layout/Layout";
import DashboardPage from "@/page/Dashboard";
import GoalsPage from "@/page/GoalsPage";
import LoginPage from "@/page/LoginPage";
import RegisterPage from "@/page/RegisterPage";
import TasksPage from "@/page/TasksPage";
import Private from "@/private/Private";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Private>
            <DashboardPage />
          </Private>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/tasks",
        element: (
          <Private>
            <TasksPage />
          </Private>
        ),
      },
      {
        path: "/goals",
        element: (
          <Private>
            <GoalsPage />
          </Private>
        ),
      },
      {},
    ],
  },
]);

export default router;
