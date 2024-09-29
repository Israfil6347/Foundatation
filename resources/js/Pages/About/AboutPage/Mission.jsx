import PublicTemplateLayout from "@/Layouts/PublicTemplateLayout";
import { Head, useRemember } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useEffect } from "react";

function Mission({ auth }) {
const [pageData,setPageData]= useRemember()
  useEffect(()=>{
      axios
      .get(route('pages.getPostBySlug','mission-vision'))
      .then((response) => {
        setPageData(response.data.data)
      })
      .catch((error) => {
       
      })
      .finally(() => {
      
      });

  },[])

  return (
    <div>
      <PublicTemplateLayout auth={auth}>
        <Head title="Mission" />
        <motion.div
          className=""
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          exit={{
            opacity: 0,
            x: -window.innerWidth,
            transition: { duration: 0.3 },
          }}
          initial={{
            opacity: 0,
            x: -window.innerWidth,
          }}
          animate={{ x: 0, opacity: 1 }}
        >
          <div className="container mx-auto">
            <div className="border border-dashed border-secondary bg-surface text-onSurface">
              <div className="px-4 py-10 md:px-6 lg:py-20 lg:px-10">
                <div className="container mx-auto">
                  <div className="mb-20 text-center">
                    <div className="font-semibold uppercase text-secondary">
                      Our Mission and Vision
                    </div>
                    <div className="text-3xl font-extrabold text-primary">
                     {pageData?.subtitle}
                    </div>
                    <div className=""></div>
                  </div>
                  <section className="space-y-6">
                    <div
                      className="max-w-full prose text-justify leading-loose"
                      dangerouslySetInnerHTML={{
                          __html: pageData?.body ?? '',
                      }}
                    >
                   </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </PublicTemplateLayout>
    </div>
  );
}

export default Mission;
