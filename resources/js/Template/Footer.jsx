import { Link } from "@inertiajs/react";
import myLogo from "../../assets/brand/my_logo.png";

function Footer({ auth,  settingData}) {
  return (
    <div className="mt-auto text-center bg-surface text-onSurface ">
      <footer className="">
        <div className="container flex flex-col items-center justify-center p-3 py-6 mx-auto">
          <Link to="#" className="flex flex-col items-center justify-center ">
            {/*<img className="h-20" src={originalLogo} alt="header logo"/>*/}
            <p className={`mt-2 font-extrabold`}>

              {settingData?.organization_short_name}
             
            </p>
            <p className="text-sm font-light">
            {settingData?.address}
            </p>
          </Link>

          <p className="mb-4 text-sm font-light">
            {`©${new Date().getFullYear()}  ${settingData?.organization_short_name} All Rights Reserved.`}
          </p>

          <div className="flex flex-col items-center justify-center gap-2">
            <img className="h-6 -mb-2" src={myLogo} alt="header logo" />
            <p className="text-xs font-light">Developed by DC Quantum Labs</p>
          </div>
          {auth.user ? (
            <Link
              href={route("dashboard")}
              className="px-4 text-xs hover:font-bold hover:underline "
            >
              <span>User Panel</span>
            </Link>
          ) : (
            <>
              <Link
                href={route("login")}
                className="px-4 text-xs hover:font-bold hover:underline "
              >
                <span className="">Webmaster Login</span>
              </Link>
            </>
          )}
        </div>
      </footer>

      <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
    </div>
  );
}

export default Footer;
