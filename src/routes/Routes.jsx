import Layout from "@/layout/Layout";
import DashboardPage from "@/page/Dashboard";
import GoalsPage from "@/page/GoalsPage";
import LoginPage from "@/page/LoginPage";
import RegisterPage from "@/page/RegisterPage";
import TasksPage from "@/page/TasksPage";

import { createBrowserRouter } from "react-router-dom";






const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
        {
            path:'/',
            element:<DashboardPage/>
        }
        ,
        {
          path:'/login',
          element:<LoginPage/>
        },
        {
          path:'/register',
          element:<RegisterPage/>
        },
        {
          path:'/tasks',
          element:<TasksPage/>
        },
        {
          path:'/goals',
          element:<GoalsPage/>
        },
        {

        }

    ]
    
   
         

    
  }
]);

export default router;
