import { Link } from "@inertiajs/react";
import originalLogo from "../../assets/brand/logo_original.png";

function Header({ scrollFromTop, OpenTopNav, setOpenTopNav, urlArrays,settingData }) {
  return (
    <div>
      <div className="hidden h-10 md:hidden lg:block">
        <div className="container flex justify-between h-full mx-auto">
          <ul className="flex h-full gap-2 divide-x divide-neutral-700 text-onSurface">
            <li className="flex items-center justify-center">
              <span className="">Contact: {settingData?.customer_support_contact}</span>
            </li>
            <li className="flex items-center justify-center pl-2">
              {settingData?.customer_support_email}
            </li>
          </ul>
          <div className="flex flex-col items-center justify-center">
            <ul className="flex gap-2">
              <li className="flex flex-col items-center justify-center w-8 h-8 text-xl transition-all duration-200 rounded-full shadow bg-surface text-onSurface hover:scale-125 hover:text-error">
                <button
                  onClick={() => {
                    window.open(
                      `${settingData?.facebook_page}`,
                      // "https://www.facebook.com/fcjyf2019",
                      "_blank",
                      "noreferrer"
                    );
                  }}
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </button>
              </li>
              <li className="flex flex-col items-center justify-center w-8 h-8 text-xl transition-all duration-200 rounded-full shadow bg-surface text-onSurface hover:scale-125 hover:text-error">
                <button
                  onClick={() => {
                    window.open(
                      "https://www.linkedin.com/in/fcjyf",
                       `${settingData?.youtube_url}`,
                      "_blank",
                      "noreferrer"
                    );
                  }}
                >
                  <i className="fa-brands fa-linkedin"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <header
        className={`${
          scrollFromTop && "fixed top-0 left-0 right-0"
        } z-50 h-20 w-full bg-surface shadow transition-all duration-300  `}
      >
        <div className="relative h-full">
          <div className="container flex flex-wrap items-center justify-between h-full mx-auto">
            <div className="ml-3 md:ml-0">
              <Link to="/" className="flex ">
                <img
                  className={`mr-3 h-10 md:h-16 `}
                  src={originalLogo}
                  alt="header logo"
                />
                <div className="flex flex-col justify-center">
                  <h1 className="-mb-1.5 text-sm font-bold md:text-lg">
                   {settingData?.organization_name}
                  </h1>
                  <p className="text-[10px]">{settingData?.slogan}</p>
                </div>
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center mx-3 rounded-lg lg:hidden"
              onClick={() => {
                setOpenTopNav(!OpenTopNav);
              }}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/3000/svg"
              >
                <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
              </svg>
            </button>

            <div
              className={`${
                OpenTopNav
                  ? "fixed inset-0 top-20 h-screen w-screen bg-surface   "
                  : "hidden"
              } lg:block`}
            >
              <ul
                className={`flex h-20 flex-col items-center gap-4 lg:flex-row`}
              >
                <li>
                  <Link
                    href={route("home")}
                    className={`main-menu flex py-2 items-center justify-center transition-all duration-300 hover:font-bold ${
                      urlArrays[1] === "" ? "active" : ""
                    }`}
                  >
                    Home
                  </Link>
                </li>

                <li className="flex flex-col items-center gap-4 group lg:relative">
                  <Link
                    className={`main-menu w-full px-4 py-2  text-center transition-all duration-300 hover:bg-primary hover:text-onPrimary lg:text-right ${
                      urlArrays === "about" ? "active" : ""
                    }`}
                    href={route("about")}
                  >
                    About
                  </Link>
                  <ul className="flex flex-col items-center bg-surface text-onSurface hover:cursor-pointer group-hover:visible lg:invisible lg:absolute lg:right-0 lg:top-12 lg:z-10 lg:w-72 lg:overflow-hidden lg:rounded-b-md">
                    <Link
                      className="w-full px-4 py-2 text-center transition-all duration-300 main-menu hover:bg-primary hover:text-onPrimary lg:text-right"
               
                      href={route("about")}
                    >
                      About Us
                    </Link>
                    <Link
                      className="w-full px-4 py-2 text-center transition-all duration-300 main-menu hover:bg-primary hover:text-onPrimary lg:text-right"
                   
                      href={route("about/our-history")}
                    >
                      Our History
                    </Link>
                    <Link
                      className="w-full px-4 py-2 text-center transition-all duration-300 main-menu hover:bg-primary hover:text-onPrimary lg:text-right"
                      
                      href={route("about/mission-vision")}
                    >
                      Mission & Vision
                    </Link>

                    <Link
                      className="w-full px-4 py-2 text-center transition-all duration-300 main-menu hover:bg-primary hover:text-onPrimary lg:text-right"
                
                      href={route("about/structure-and-partners")}
                    >
                      Structure and Partners
                    </Link>

                    <Link
                      className="w-full px-4 py-2 text-center transition-all duration-300 main-menu hover:bg-primary hover:text-onPrimary lg:text-right"
                   
                      href={route("about/activities")}
                    >
                      Activities
                    </Link>

                    <Link
                      className="w-full px-4 py-2 text-center transition-all duration-300 main-menu hover:bg-primary hover:text-onPrimary lg:text-right"
                  
                      href={route("about/chairman-message")}
                    >
                      Chairman Message
                    </Link>
                  </ul>
                </li>

                <li>
                  <Link
                    href={route("publication")}
                    className={`main-menu transition-all py-2  duration-300 hover:font-bold ${
                      urlArrays[1] === "publication" ? "active" : ""
                    }`}
                  >
                    Publications
                  </Link>
                </li>

                <li>
                  <Link
                    href={route("notices")}
                    className={`main-menu transition-all py-2 duration-300 hover:font-bold ${
                      urlArrays[1] === "notices" ? "active" : ""
                    }`}
                  >
                    Notices
                  </Link>
                </li>

                <li>
                  <Link
                  
                    href={route("gallery")}
                    className={`main-menu transition-all py-2 duration-300 hover:font-bold ${
                      urlArrays[1] === "gallery" ? "active" : ""
                    }`}
                  >
                    Gallery
                  </Link>
                </li>

                <li>
                  <Link
                   
                    href={route("donate")}
                    className={`main-menu transition-all py-2 duration-300 hover:font-bold ${
                      urlArrays[1] === "donate" ? "active" : ""
                    }`}
                  >
                    Donate
                  </Link>
                </li>

                <li className="relative inline-block group">
                  <Link
                  
                    href={route("faq")}
                    className={`main-menu transition-all py-2 duration-300 hover:font-bold ${
                      urlArrays[1] === "faq" ? "active" : ""
                    }`}
                  >
                    FAQ
                  </Link>
                </li>

                <li className="relative inline-block group">
                  <Link
                    href={route("contact")}
                    className={`main-menu transition-all py-2 duration-300 hover:font-bold ${
                      urlArrays[1] === "contact" ? "active" : ""
                    }`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
