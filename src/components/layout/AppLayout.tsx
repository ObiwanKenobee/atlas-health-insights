import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { MobileNav } from "./MobileNav";

export const AppLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-x-hidden pb-20 md:pb-6">
          <div className="px-4 md:px-6 lg:px-8 py-6 max-w-[1600px] mx-auto w-full animate-fade-in">
            <Outlet />
          </div>
        </main>
        <MobileNav />
      </div>
    </div>
  );
};
