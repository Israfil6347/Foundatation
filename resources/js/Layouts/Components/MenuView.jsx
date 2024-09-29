import { Link } from "@inertiajs/react";

const MenuView = ({ sidebarOpen, toggleSidebar, menu }) => {
  return (
    <li className="flex items-center duration-300 border-b border-purple-100 border-dashed transition-color group bg-surface text-onSurface hover:bg-background hover:bg-blue-gray-900 hover:text-background">
      <Link
        href={route(`${menu?.Route}`)}
        className={`flex h-full w-full items-center bg-transparent px-4 py-2 text-onSurface transition-all duration-300 
        ${
          sidebarOpen && "group-hover:scale-105"
        }  sidebar-menu text-primary group-hover:bg-background group-hover:text-onBackground`}
      >
        <span className="text-xl">
          <i className={`${menu?.Icon}  group-active:text-orange-900`}></i>
        </span>
        {sidebarOpen ? <span className="pl-4 ">{menu?.MenuTitle}</span> : null}
      </Link>
    </li>
  );
};

export default MenuView;
