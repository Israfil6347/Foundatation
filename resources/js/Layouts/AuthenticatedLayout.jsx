import { Link, useRemember } from "@inertiajs/react";
import { useEffect } from "react";
import 'react-quill/dist/quill.snow.css';
import { Outlet } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import SidebarComponent from "../Layouts/Components/SidebarComponent";
import {  adminMenus, SuperAdminMenus, visitorMenus } from "./Components/data/adminAndSuperAdminMenus";

export default function Authenticated({ user, header, children }) {
  const [sidebarOpen, setSidebarOpen] = useRemember(false);
  const [menus, setMenus] = useRemember([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if(user.role=== "Super Admin"){
      setMenus(SuperAdminMenus);
    }else if(user.role=== "Admin"){
      setMenus(adminMenus);
    }else{
      setMenus(visitorMenus);
    }
  }, [user, menus]);

  return (
    <>
      <div className="relative w-full h-screen bg-background">
        <section className={`ml-14 h-full`}>
          <header className="w-full h-16">
            {/* <Header /> */}
            <header className="flex items-center justify-between w-full h-full px-6 shadow bg-surface text-onSurface">
              <div className="flex items-center gap-2 cursor-pointer">
                <Link
                  href={route("home")}
                  className="flex items-center justify-center p-2 text-xl transition-all duration-300 rounded-full h-9 w-9 bg-primary text-onPrimary hover:scale-110 md:hidden"
                >
                  <i className="fa-solid fa-repeat"></i>

                  <span className="sr-only ">Switch To Front</span>
                </Link>
                <Link
                  href={route("home")}
                  className="hidden transition-all duration-300 text-onSurface hover:underline md:block"
                >
                  <span className="">Switch To Front</span>
                </Link>
              </div>
              <div className="flex items-center h-full gap-2">


                <div className="relative h-full group">
                  <button className="flex items-center h-full gap-2">
                    <span className="flex items-center h-full">
                      <img
                        // src={user?.photo}
                        src={
                          user?.photo !== null && user?.photo !== undefined
                            ? user.photo
                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH_mjW-rvOfpg1q3Lum1d4HbvOIFhrSidaaA&usqp=CAU'
                        }
                        alt="user profile"
                        className="rounded-full h-9 w-9"
                      />
                    </span>
                    <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
                      <div className="text-left">
                        <div className="">{user?.name}</div>
                        <div className="text-[9px]">
                          {user?.role ? user?.role : "Visitor"}
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="">
                  <Link
                    className="flex items-center justify-center p-2 text-xl transition-all duration-300 rounded-full h-9 w-9 bg-primary text-onPrimary hover:scale-110"
                    href={route("logout")}
                    method="post"
                  >
                    <span className="sr-only">Log out</span>
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </Link>
                </div>
              </div>
            </header>
          </header>
          <section className="h-[calc(100vh-112px)] overflow-auto">
            <Outlet />
            {children}
          </section>
          <section id="footer" className="w-full h-12 mt-auto">
            {/* <Footer /> */}
            <footer className="flex items-center justify-center w-full h-full border-l shadow bg-surface text-onSurface">
              <p className="text-sm font-light text-center">
                Developed by DC Quantum Labs
              </p>
            </footer>
          </section>
        </section>
        <section className="fixed top-0 left-0 h-full">
          <SidebarComponent
            menus={menus}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </section>
      </div>
    </>
  );
}
