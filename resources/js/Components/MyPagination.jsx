import React from 'react';

const MyPagination = ({ currentPage, meta, setCurrentPage,handlePageChange }) => {
  return (
    <div className="my-2 flex items-center justify-between py-2 px-4">
      <div className="">{`Showing ${meta?.from} to ${meta?.to} of ${meta?.total} results`}</div>
      <div className="flex gap-1">
        {meta?.links.map((link, index) => {
          if (link.label?.includes('Previous')) {
            return (
              <button
                key={index}
                disabled={meta?.current_page === 1 ? true : false}
                className={`flex h-8 w-8 items-center justify-center disabled:bg-gray-600 ${
                  link.active
                    ? 'bg-secondary p-2 text-onSecondary'
                    : 'bg-primary p-2 text-onPrimary'
                } rounded-full  hover:cursor-pointer`}
                onClick={() => {
                  // setCurrentPage((parseInt(currentPage) - 1).toString());
                  handlePageChange(currentPage - 1)
                }}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
            );
          } else if (link.label?.includes('Next')) {
            return (
              <button
                key={index}
                disabled={meta?.current_page === meta?.last_page ? true : false}
                className={`flex h-8 w-8 items-center justify-center disabled:bg-gray-600 ${
                  link.active
                    ? 'bg-secondary p-2 text-onSecondary'
                    : 'bg-primary p-2 text-onPrimary'
                } rounded-full  hover:cursor-pointer`}
                onClick={() => {
                  // setCurrentPage((parseInt(currentPage) + 1).toString());
                  handlePageChange(currentPage + 1)
                }}
              >
                <i className="fa-solid fa-angle-right"></i>
              </button>
            );
          } else {
            if (
              link.label === '1' ||
              link.label === (meta?.current_page + 1).toString() ||
              link.label === (meta?.current_page - 1).toString() ||
              link.label === meta?.current_page?.toString() ||
              link.label === (meta?.last_page - 1).toString() ||
              link.label === meta?.last_page?.toString()
            ) {
              return (
                <div
                  key={index}
                  className={`hidden h-8 w-8 items-center justify-center md:flex ${
                    link.active
                      ? 'bg-secondary p-2 text-onSecondary'
                      : 'bg-primary p-2 text-onPrimary'
                  } rounded-full  hover:cursor-pointer`}
                  onClick={() => {
                    setCurrentPage(link.label ? link.label : '1');
                  }}
                >
                  <span>{link.label}</span>
                </div>
              );
            } else {
              return null;
            }
          }
        })}
      </div>
    </div>
  );
};

export default MyPagination;
