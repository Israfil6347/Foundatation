const ParentMenuView = ({
  sidebarOpen,
  expandOrCollapseMenu,
  menu,
  addOrRemoveExpendedMenu,
}) => {
  return (
    <li className="w-full transition-colors duration-300 border-b border-purple-100 border-dashed text-onSurface hover:bg-background hover:text-onBackground">
      <div
        onClick={() => {
          addOrRemoveExpendedMenu(menu.Id);
        }}
        className="flex items-center justify-between w-full px-4 py-2 group"
      >
        <div className="flex items-center">
          <span className="text-xl transition-all duration-300 group-hover:rotate-45">
            <i className={`${menu?.Icon}`}></i>
          </span>
          {sidebarOpen ? <span className="pl-4">{menu?.MenuTitle}</span> : null}
        </div>
        {sidebarOpen ? (
          <div>
            {expandOrCollapseMenu ? (
              <i className="fa-solid fa-minus"></i>
            ) : (
              <i className="fa-solid fa-plus"></i>
            )}
          </div>
        ) : null}
      </div>
    </li>
  );
};

export default ParentMenuView;
