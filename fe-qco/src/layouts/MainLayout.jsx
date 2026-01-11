import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-54 shrink-0 h-screen p-4">
        <SideBar />
      </aside>

      {/* Content */}
      <main className="rounded flex-1 h-screen overflow-y-auto m-2 p-2 bg-(--color-bg) dark:bg-(--color-bg-dark)">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
