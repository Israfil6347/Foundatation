import MyCard from "@/Components/MyCard";
import PublicTemplateLayout from "@/Layouts/PublicTemplateLayout";
import { Head, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";

function Index({ auth }) {
 const { AllPublication } = usePage().props;  
  return (
    <>
      <PublicTemplateLayout auth={auth}>
        <Head title="Publication" />
        <motion.div>
          <div className="container flex flex-col gap-6 mx-auto text-left md:text-justify lg:text-justify">
            <div className="mb-10 text-center">
              <div className="font-semibold uppercase text-secondary">
                PUBLICATIONS
              </div>
              <div className="text-3xl font-extrabold text-primary ">
                Our latest publications
              </div>
              <div className=""></div>
            </div>
              {!AllPublication || !AllPublication.data || AllPublication.data.length === 0 ? 
            <section className="border border-dashed border-secondary bg-surface text-onSurface">
              <div className="container mx-auto">
                <div className="py-16 border border-gray-300 border-dashed bg-blue-gray-50 text-onSurface">
                  <div className="text-center">
                    <h1 className="text-3xl font-extrabold md:text-5xl lg:text-7xl">
                      Publications
                    </h1>
                    <p>No publications has been published yet.</p>
                  </div>
                </div>
              </div>
            </section> : 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
                  {AllPublication?.data?.map((data, index)=>{
                    return(
                        <MyCard key={index} bgColor="bg-surface" rounded="full">
                          <div className={`group flex p-4 border border-dashed border-secondary  text-onSurface`}>  
                            <div className="flex flex-col items-center justify-center">
                                <i class="fa-solid fa-file-pdf text-3xl"></i>
                            </div>
                            <div className="ml-4 grow text-left">
                             <div className="p-2 ">
                              <div className="pt-1 text-xs group-hover:cursor-pointer">
                                  <a
                                    download
                                    href={data?.attachment_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-light hover:underline "
                                  >
                                    Download PDF
                                </a>
                              </div> 
                              <h2 className="text-xl font-semibold">{data?.title}</h2>
                              <h2 className="text-sm">{data.subtitle}</h2>
                          </div>
                            </div>
                          </div>

                      </MyCard>
                    )
                  })}
                 
                </div>
            }
          </div>
        </motion.div>
      </PublicTemplateLayout>
    </>
  );
}

export default Index;
