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
      className={`
        h-full flex flex-col py-4
        bg-(--color-surface) text-(--color-text)
        dark:bg-(--color-surface-dark) dark:text-(--color-text-dark)
      `}
    >
      {/* Logo */}
      <div
        className={`mb-10 px-2.5 text-[2.5rem] title transition-all duration-300 ${
          collapsed ? "text-center" : "text-left"
        }`}
      >
        <span>{collapsed ? "Q" : "QCO"}</span>
      </div>

      {/* Menu */}
      <nav className="flex-1 flex flex-col gap-4">
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
          className={`flex items-center cursor-pointer rounded-full px-3 py-2 transition
  ${collapsed ? "justify-center" : "justify-between"}
  hover:bg-[#9c9df3]`}
        >
          {theme === "dark" ? <LuSun /> : <LuMoon />}
          {!collapsed && <span>{theme === "dark" ? "Light" : "Dark"}</span>}
        </div>

        {/* Collapse button */}
        <button
          onClick={onToggle}
          className="flex items-center justify-center rounded-full p-2 hover:bg-[#9c9df3] transition"
        >
          {collapsed ? <LuChevronRight /> : <LuChevronLeft />}
        </button>
      </div>
    </aside>
  );
}

const MenuItem = ({ to, icon: Icon, label, collapsed }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center gap-3 px-3 py-1.5 rounded-full transition
        hover:bg-[#9c9df3]
        ${collapsed ? "justify-center" : ""}
        ${isActive ? "btn font-semibold" : ""}
      `
      }
    >
      <Icon size={20} />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

export default SideBar;
