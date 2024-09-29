import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
// import { Head } from '@inertiajs/react';
import { motion } from "framer-motion";

export default function Index({ auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Home
        </h2>
      }
    >
      {/* <Head title="Dashboard" /> */}

      <div>
        {/* <Loading isLoading={loading} /> */}
        <motion.div
          initial={{ opacity: 1, x: "100vw", skewX: "-30deg" }}
          animate={{
            x: 0,
            y: 0,
            skewX: "0deg",
            opacity: 1,
            transition: { velocity: 10 },
          }}
          className="p-2"
        >
          <div className="pb-2">
            <div className="text-2xl font-bold text-onSurface">Dashboard</div>
          </div>
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Link
              // to={'/auth/pages'}
              className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:cursor-pointer hover:shadow"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-6 text-blue-600 bg-blue-100 rounded-full">
                <i className="text-xl fa-brands fa-page4"></i>
              </div>
              <div>
                <div className="-mb-1 text-xl font-bold">Pages</div>
                <div className="-mt-1 text-sm text-gray-500">
                  <span className="text-green-900">
                    {/* {data?.data?.publishedPages}  */}
                    Published
                  </span>
                  <span> & </span>
                  <span className="text-orange-500">
                    {/* {data?.data?.draftPages}  */}
                    Draft.
                  </span>
                </div>
              </div>
            </Link>

            <Link
              // to={'/auth/Notices'}
              className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:cursor-pointer hover:shadow"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-6 text-blue-600 bg-blue-100 rounded-full">
                <i className="text-xl fa-solid fa-bullhorn"></i>
              </div>
              <div>
                <div className="-mb-1 text-xl font-bold">Notices</div>
                <div className="-mt-1 text-sm text-gray-500">
                  <span className="text-green-900">
                    {/* {data?.data?.publishedNotices} */}
                     Published
                  </span>
                  <span> & </span>
                  <span className="text-orange-500">
                    {/* {data?.data?.draftNotices} */}
                     Draft.
                  </span>
                </div>
              </div>
            </Link>

            <Link
              // to={'/auth/downloads'}
              className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:cursor-pointer hover:shadow"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-6 text-blue-600 bg-blue-100 rounded-full">
                <i className="text-xl fa-solid fa-file-pdf"></i>
              </div>
              <div>
                <div className="-mb-1 text-xl font-bold">Forms</div>
                <div className="-mt-1 text-sm text-gray-500">
                  <span className="text-green-900">
                    {/* {data?.data?.publishedForms}  */}
                    Published
                  </span>
                  <span> & </span>
                  <span className="text-orange-500">
                    {/* {data?.data?.draftForms} */}
                     Draft.
                  </span>
                </div>
              </div>
            </Link>

            <Link
              // to={'/auth/deposit-products'}
              className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:cursor-pointer hover:shadow"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-6 text-blue-600 bg-blue-100 rounded-full">
                <i className="text-xl fa-solid fa-piggy-bank"></i>
              </div>
              <div>
                <div className="-mb-1 text-xl font-bold">Saving Products</div>
                <div className="-mt-1 text-sm text-gray-500">
                  <span className="text-green-900">
                    {/* {data?.data?.publishedSavingDeposits}  */}
                    Published
                  </span>
                  <span> & </span>
                  <span className="text-orange-500">
                    {/* {data?.data?.draftSavingDeposits} */}
                     Draft.
                  </span>
                </div>
              </div>
            </Link>

            <Link
              // to={'/auth/publication'}
              className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:cursor-pointer hover:shadow"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-6 text-blue-600 bg-blue-100 rounded-full">
                <i className="text-xl fa-solid fa-sack-dollar"></i>
              </div>
              <div>
                <div className="-mb-1 text-xl font-bold">Loan Products</div>
                <div className="-mt-1 text-sm text-gray-500">
                  <span className="text-green-900">
                    {/* {data?.data?.publishedLoanProducts} */}
                     Published
                  </span>
                  <span> & </span>
                  <span className="text-orange-500">
                    {/* {data?.data?.draftLoanProducts} */}
                     Draft.
                  </span>
                </div>
              </div>
            </Link>

            <Link
              // to={'/auth/leaders'}
              className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:cursor-pointer hover:shadow"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-6 text-blue-600 bg-blue-100 rounded-full">
                <i className="text-xl fa-solid fa-user-tie"></i>
              </div>
              <div>
                <div className="-mb-1 text-xl font-bold">Leaders</div>
                <div className="-mt-1 text-sm text-gray-500">
                  <span className="text-green-900">
                    {/* {data?.data?.publishedLeaders} */}
                     Published
                  </span>
                  <span> & </span>
                  <span className="text-orange-500">
                    {/* {data?.data?.draftLeaders} */}
                     Draft.
                  </span>
                </div>
              </div>
            </Link>

            <Link
              // to={'/auth/gallery-images'}
              className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:cursor-pointer hover:shadow"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-6 text-blue-600 bg-blue-100 rounded-full">
                <i className="text-xl fa-regular fa-images"></i>
              </div>
              <div>
                <div className="-mb-1 text-xl font-bold">Gallery Images</div>
                <div className="-mt-1 text-sm text-gray-500">
                  <span className="text-green-900">
                    {/* {data?.data?.publishedGalleryImages}  */}
                    Published
                  </span>
                  <span> & </span>
                  <span className="text-orange-500">
                    {/* {data?.data?.draftGalleryImages}  */}
                    Draft.
                  </span>
                </div>
              </div>
            </Link>

            <Link
              // to={'/auth/slider-images'}
              className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:cursor-pointer hover:shadow"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-6 text-blue-600 bg-blue-100 rounded-full">
                <i className="text-xl fa-solid fa-panorama"></i>
              </div>
              <div>
                <div className="-mb-1 text-xl font-bold">Slider Images</div>
                <div className="-mt-1 text-sm text-gray-500">
                  <span className="text-green-900">
                    {/* {data?.data?.publishedSliderImages} */}
                    Published
                  </span>
                  <span> & </span>
                  <span className="text-orange-500">
                    {/* {data?.data?.draftSliderImages} */}
                    Draft,
                  </span>
                </div>
              </div>
            </Link>

            <Link
              // to={'/auth/our-services'}
              className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:cursor-pointer hover:shadow"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-6 text-blue-600 bg-blue-100 rounded-full">
                <i className="text-xl fa-solid fa-hands-holding-child"></i>
              </div>
              <div>
                <div className="-mb-1 text-xl font-bold">Services</div>
                <div className="-mt-1 text-sm text-gray-500">
                  <span className="text-green-900">
                    {/* {data?.data?.publishedServices}  */}
                    Published
                  </span>
                  <span> & </span>
                  <span className="text-orange-500">
                    {/* {data?.data?.draftServices}  */}
                    Draft.
                  </span>
                </div>
              </div>
            </Link>

            <Link
              // to={'/auth/users'}
              className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:cursor-pointer hover:shadow"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-6 text-blue-600 bg-blue-100 rounded-full">
                <i className="text-xl fa-solid fa-users"></i>
              </div>
              <div>
                <div className="-mb-1 text-xl font-bold">Users</div>
                <div className="-mt-1 text-sm text-gray-500">
                  <span className="text-green-900">
                    {/* {data?.data?.publishedUsers} */}
                    Active
                  </span>
                  <span> & </span>
                  <span className="text-orange-500">
                    {/* {data?.data?.draftUsers} */}
                    Inactive.
                  </span>
                </div>
              </div>
            </Link>

            <div className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:cursor-not-allowed hover:shadow">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-6 text-blue-600 bg-blue-100 rounded-full">
                <i className="text-xl fa-solid fa-people-group"></i>
              </div>
              <div>
                <div className="-mb-1 text-xl font-bold ">Visitors</div>
                <div className="-mt-1 text-sm text-gray-500">
                  <span className="text-green-900">
                    {/* {data?.data?.todaysVisitors}  */}
                    people visited today.
                  </span>
                  <span> & </span>
                  <span className="text-orange-500">
                    {/* {data?.data?.totalVisitors}  */}
                    people visited in total.
                  </span>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </AuthenticatedLayout>
  );
}
