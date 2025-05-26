import Layout from "@/layout/Layout";
import DashBoard from "@/page/Dashboard";
import { createBrowserRouter } from "react-router-dom";






const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
        {
            path:'/',
            element:<DashBoard/>
        }
    ]
    
   
         

    
  }
]);

export default router;
