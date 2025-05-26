import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

const Layout = () => {
  const location = useLocation();

  // Login/Register route গুলোর path তালিকা
  const noSidebarRoutes = ["/login", "/register"];

  const hideSidebar = noSidebarRoutes.includes(location.pathname);

  return (
    <div>
      <SidebarProvider>
        {!hideSidebar && <AppSidebar variant="inset" />}
        <SidebarInset>
          {!hideSidebar && <SiteHeader />}
          <div className="flex flex-1 flex-col">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
