import { useState } from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`h-screen p-4 transition-all duration-300 ${
          collapsed ? "w-20" : "w-56"
        }`}
      >
        <SideBar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      </aside>

      {/* Content */}
      <main
        className={`
          flex-1 h-screen overflow-y-auto m-2 p-2 rounded
          bg-(--color-bg) text-(--color-text)
          dark:bg-(--color-bg-dark) dark:text-(--color-text-dark)
        `}
      >
        <Outlet />
      </main>
    </div>
  );
}
export default MainLayout;
