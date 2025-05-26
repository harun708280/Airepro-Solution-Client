import Layout from "@/layout/Layout";
import DashboardPage from "@/page/Dashboard";
import LoginPage from "@/page/LoginPage";
import RegisterPage from "@/page/RegisterPage";

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

    ]
    
   
         

    
  }
]);

export default router;
