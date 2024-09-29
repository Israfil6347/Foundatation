import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useRemember } from "@inertiajs/react";
// import { Head } from '@inertiajs/react';
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Dashboard({ auth }) {

  const [PublishAndDraftData,setPublishAndDraftData]= useRemember([])

  useEffect(()=>{
     axios
      .get(route('admin.getAllPublishAndDraftCalculation'))
      .then((response) => {
        // console.log(response.data)
        setPublishAndDraftData(response.data)
      })
      .catch((error) => {

      })
      .finally(() => {

      });
  },[])

  console.log(PublishAndDraftData)



  const pageRedirectHandler = (link) => {
    router.get(link)
  }

  
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Home
        </h2>
      }
    >
      <Head title="Dashboard" />

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
         
            {auth.user?.role === "Visitor" ? 
             <section className="flex flex-col items-center justify-center bg-background text-onSurface">
              <div className="container mx-auto">
                <div className="py-16 border border-dashed border-secondary bg-surface text-onSurface">
                  <div className="text-center">
                    <h1 className="text-3xl font-extrabold md:text-5xl lg:text-7xl">
                      Notices
                    </h1>
                    <p>Please contact tha admin user.</p>
                  </div>
                </div>
              </div>
            </section>  :
             <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <div
                  // to={'pages.index'}
                  onClick={() => {
                    pageRedirectHandler("pages")
                  }}
                  className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:cursor-pointer hover:shadow"
                >
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-6 text-blue-600 bg-blue-100 rounded-full">
                    <i className="text-xl fa-brands fa-page4"></i>
                  </div>
                  <div>
                    <div className="-mb-1 text-xl font-bold">Pages</div>
                    <div className="-mt-1 text-sm text-gray-500">
                      <span className="text-green-900">
                        Published({PublishAndDraftData?.data?.publishedPages})
                      </span>
                      <span> & </span>
                      <span className="text-orange-500">
                        Draft({PublishAndDraftData?.data?.draftPages}).
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  // to={'pages.index'}
                  onClick={() => {
                    pageRedirectHandler("adminDonate")
                  }}
                  className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:cursor-pointer hover:shadow"
                >
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-6 text-blue-600 bg-blue-100 rounded-full">
                    <i className="text-xl fa-solid fa-piggy-bank"></i>
                  </div>
                  <div>
                    <div className="-mb-1 text-xl font-bold">Donate Accounts</div>
                    <div className="-mt-1 text-sm text-gray-500">
                      <span className="text-green-900">
                         Published({PublishAndDraftData?.data?.publishedDonate})
                      </span>
                      <span> & </span>
                      <span className="text-orange-500">
                        Draft({PublishAndDraftData?.data?.draftDonate}).
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  // to={'pages.index'}
                  onClick={() => {
                    pageRedirectHandler("adminPublication")
                  }}
                  className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:cursor-pointer hover:shadow"
                >
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-6 text-blue-600 bg-blue-100 rounded-full">
                    <i className="text-xl fa-solid fa-sack-dollar"></i>
                  </div>
                  <div>
                    <div className="-mb-1 text-xl font-bold">Publication</div>
                    <div className="-mt-1 text-sm text-gray-500">
                      <span className="text-green-900">
                        Published({PublishAndDraftData?.data?.publishedPublication})
                      </span>
                      <span> & </span>
                      <span className="text-orange-500">
                          Draft({PublishAndDraftData?.data?.draftPublication}).
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => {
                    pageRedirectHandler("adminNotices")
                  }}
                  className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:cursor-pointer hover:shadow"
                >
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-6 text-blue-600 bg-blue-100 rounded-full">
                    <i className="text-xl fa-solid fa-bullhorn"></i>
                  </div>
                  <div>
                    <div className="-mb-1 text-xl font-bold">Notices</div>
                    <div className="-mt-1 text-sm text-gray-500">
                      <span className="text-green-900">
                        Published({PublishAndDraftData?.data?.publishedNotices})
                      </span>
                      <span> & </span>
                      <span className="text-orange-500">
                        Draft({PublishAndDraftData?.data?.draftNotices}).
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => {
                    pageRedirectHandler("adminGalleryImage")
                  }}
                  className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:cursor-pointer hover:shadow"
                >
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-6 text-blue-600 bg-blue-100 rounded-full">
                    <i className="text-xl fa-solid fa-bullhorn"></i>
                  </div>
                  <div>
                    <div className="-mb-1 text-xl font-bold">Gallery</div>
                    <div className="-mt-1 text-sm text-gray-500">
                      <span className="text-green-900">
                      Published({PublishAndDraftData?.data?.publishedGallery})
                      </span>
                      <span> & </span>
                      <span className="text-orange-500">
                         Draft({PublishAndDraftData?.data?.draftGallery}).
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => {
                    pageRedirectHandler("users")
                  }}
                  className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:cursor-pointer hover:shadow"
                >
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-6 text-blue-600 bg-blue-100 rounded-full">
                    <i class="text-xl fa-solid fa-users"></i>
                  </div>
                  <div>
                    <div className="-mb-1 text-xl font-bold">User</div>
                    <div className="-mt-1 text-sm text-gray-500">
                      <span className="text-green-900">
                        Active({PublishAndDraftData?.data?.publishedUsers})
                      </span>
                      <span> & </span>
                      <span className="text-orange-500">
                        Deactivate({PublishAndDraftData?.data?.draftUsers}).
                      </span>
                    </div>
                  </div>
                </div>
              </section>}
        </motion.div>
      </div>
    </AuthenticatedLayout>
  );
}
