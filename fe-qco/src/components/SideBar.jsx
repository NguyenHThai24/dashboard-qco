import logoIMG from "../../public/change-logo.png";

import {
  LuLayoutDashboard,
  LuArrowLeftRight,
  LuSettings,
  LuUserRound,
  LuLogOut,
  LuMoon,
  LuSun,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function SideBar({ collapsed, onToggle }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      className={`flex h-full flex-col bg-(--color-surface) px-2.5 py-4 text-(--color-text) dark:bg-(--color-surface-dark) dark:text-(--color-text-dark)`}
    >
      {/* Logo */}
      <div
        className={`title mb-10 flex items-center justify-center gap-2 text-center text-[2.5rem] transition-all duration-300`}
      >
        <div className="rounded bg-(--color-primary) p-1.5">
          <img src={logoIMG} alt="logo" className="w-8" />
        </div>

        {!collapsed && <span>QCO</span>}
      </div>

      {/* Menu */}
      <nav className="flex flex-1 flex-col gap-4">
        <MenuItem
          to="/"
          icon={LuLayoutDashboard}
          label="Dashboard"
          collapsed={collapsed}
        />
        <MenuItem
          to="/translations"
          icon={LuArrowLeftRight}
          label="Translations"
          collapsed={collapsed}
        />
        <MenuItem
          to="/settings"
          icon={LuSettings}
          label="Settings"
          collapsed={collapsed}
        />
        <MenuItem
          to="/profile"
          icon={LuUserRound}
          label="Profile"
          collapsed={collapsed}
        />
        <MenuItem
          to="/logout"
          icon={LuLogOut}
          label="Sign out"
          collapsed={collapsed}
        />
      </nav>

      {/* Bottom actions */}
      <div className="flex flex-col gap-3 px-2">
        <div
          onClick={toggleTheme}
          className={`flex cursor-pointer items-center rounded-full border-b px-3 py-2 transition ${collapsed ? "justify-center" : "justify-between"} hover:bg-[#9c9df3]`}
        >
          {theme === "dark" ? <LuSun /> : <LuMoon />}
          {!collapsed && <span>{theme === "dark" ? "Light" : "Dark"}</span>}
        </div>

        {/* Collapse button */}
        <button
          onClick={onToggle}
          className="mx-auto rounded-full border bg-(--color-primary) p-2 hover:bg-[#9c9df3]"
        >
          <span className="">
            {collapsed ? <LuChevronRight /> : <LuChevronLeft />}
          </span>
        </button>
      </div>
    </aside>
  );
}

const MenuItem = ({ to, icon, label, collapsed }) => {
  const Icon = icon;
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-full px-3 py-1.5 transition hover:bg-[#9c9df3] ${collapsed ? "justify-center" : ""} ${isActive ? "btn font-semibold" : ""} `
      }
    >
      <Icon size={20} />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

export default SideBar;
