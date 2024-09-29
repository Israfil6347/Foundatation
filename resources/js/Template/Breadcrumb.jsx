import NavLink from '@/Components/NavLink';
import React from 'react'

function Breadcrumb({urlArrays}) {

if (urlArrays?.length > 2) {
  return (
    
      <div className="breadcrumb_component container relative mx-auto  w-full text-onPrimary ">
            <div className="absolute left-0 right-0 -bottom-5 ml-4 w-full md:ml-0">
                <div className="flex flex-wrap uppercase">
                    <NavLink
                        to={`/${urlArrays[1]}`}
                        className="rounded-l-md bg-primaryVariant px-6 py-2 font-semibold"
                    >
                        {decodeURIComponent(urlArrays[1])}
                    </NavLink>
                    <span className="rounded-r-md bg-primary px-6 py-2">
                    {urlArrays.length > 1 && decodeURIComponent(urlArrays[2])}
                </span>
                </div>
            </div>
        </div>
   
  )
}else{
return null;
}
}

export default Breadcrumb
