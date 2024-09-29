import { motion } from 'framer-motion';
import React from 'react';
import MenuView from './MenuView';
import ParentMenuView from './ParentMenuView';

const MenusView = ({
  menu,
  sidebarOpen,
 expendedMenus = [],
  addOrRemoveExpendedMenu,
  toggleSidebar,
  childMenus,
}) => {
  const ref = React.useRef(null);
  const menuExpended = expendedMenus.find((menu_id) => menu_id === menu.Id);

  return (
    <>
      {childMenus?.length !== 0 ? (
        <ParentMenuView
          sidebarOpen={sidebarOpen}
          menu={menu}
          expendedMenus={expendedMenus}
          addOrRemoveExpendedMenu={addOrRemoveExpendedMenu}
          expandOrCollapseMenu={!!menuExpended}
        />
      ) : (
        <MenuView
          sidebarOpen={sidebarOpen}
          menu={menu}
          toggleSidebar={toggleSidebar}
        />
      )}

      {childMenus?.length !== 0 && menuExpended && (
        <motion.div
          className="overflow-hidden text-justify"
          initial={{ x: 50, opacity: 0, height: 0 }}
          animate={{ x: 0, opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5 }}
          exit={{
            x: -50,
            opacity: 0,
            transition: { duration: 0.5 },
            height: 0,
          }}
        >
          <ul className="cursor-pointer" ref={ref}>
            {childMenus?.map((childMenu) => (
              <MenusView
                key={childMenu.Id}
                menu={childMenu}
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
                childMenus={childMenu?.Menus}
                expendedMenus={expendedMenus}
                addOrRemoveExpendedMenu={addOrRemoveExpendedMenu}
              />
            ))}
          </ul>
        </motion.div>
      )}
     
    </>
  );
};

export default MenusView;
