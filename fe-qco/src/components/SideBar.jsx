import {
  LuLayoutDashboard,
  LuArrowLeftRight,
  LuSettings,
  LuBell,
  LuLogOut,
  LuMoon,
  LuSun,
  LuShuffle,
} from "react-icons/lu";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <aside className="h-screen w-full flex flex-col  py-4">
      {/* Logo */}
      <div className="mb-10 text-center gap-2 px-2.5 text-[3rem] title">
        <span>QCO</span>
      </div>

      {/* Menu */}
      <nav className="flex-1 flex flex-col w-full justify-start gap-5">
        <MenuItem to="/" icon={LuLayoutDashboard} label="Dashboard" />
        <MenuItem
          to="/translations"
          icon={LuArrowLeftRight}
          label="Translations"
        />
        <MenuItem to="/settings" icon={LuSettings} label="Settings" />
        <MenuItem to="/notifications" icon={LuBell} label="Notifications" />
        <MenuItem to="/logout" icon={LuLogOut} label="Sign out" />
      </nav>

      {/* Switch */}
      <div className="flex items-center justify-between py-4 px-2">
        <LuMoon />
        <span>Theme</span>
        <LuSun />
      </div>
    </aside>
  );
}
const MenuItem = ({ to, icon: Icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center gap-3 px-3 hover:bg-[#9c9df3] py-1.5 rounded-full text-(--color-text) dark:text-(--color-text-dark)
        ${isActive ? "btn font-semibold" : ""}
      `
      }
    >
      <Icon size={20} />
      <span>{label}</span>
    </NavLink>
  );
};
export default SideBar;
