
import { Link } from "@inertiajs/react";

import originalLogo from "../../assets/brand/logo_original.png";

export default function Guest({ children }) {
  return (
    <div className="flex flex-col items-center min-h-screen pt-6 bg-background text-onBackground sm:justify-center sm:pt-0">
      <div>
        <Link href="/">
          <img className="w-20 h-20 text-gray-500 fill-current" src={originalLogo} alt="img nor found"/>
        </Link>
      </div>

      <div className="w-full px-6 py-4 mt-6 overflow-hidden shadow-md bg-surface text-onSurface sm:max-w-md sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}
