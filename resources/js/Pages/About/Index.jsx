import PublicTemplateLayout from "@/Layouts/PublicTemplateLayout";
import { Head, useRemember } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useEffect } from "react";

function Index({ auth }) {

  const [pageData,setPageData]= useRemember()
  useEffect(()=>{
      axios
      .get(route('pages.getPostBySlug','about'))
      .then((response) => {
       
        setPageData(response.data.data)
      })
      .catch((error) => {
        
      })
      .finally(() => {
      
      });

  },[])
  return (
    <>
      <PublicTemplateLayout auth={auth}>
         <Head title="About" />
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
                      About Us
                    </div>
                    <div className="text-3xl font-extrabold text-primary">
                     {pageData?.subtitle}
                    </div>
                    <div className="">
                      {/* {pageData?.body} */}
                      {/* Father Charles Joseph Young, CSC, widely known as Fr.
                      Charles J. Young, was a trailblazer in the Credit Union
                      movement in Bangladesh. He founded “The Christian
                      Cooperative Credit Union Limited, Dhaka” to uplift the
                      socio-economic conditions of the Christian community in
                      the country. */}

                       <div
                      className="max-w-full prose text-justify leading-loose"
                      dangerouslySetInnerHTML={{
                          __html: pageData?.body ?? '',
                      }}
                    >
                   </div>
                    </div>
                  </div>
                  {/* <section className="space-y-6">
                    <p>
                      Born on May 3, 1904, in Rochester, New York, USA, Fr.
                      Young took his first vow with the Holy Cross Congregation
                      on July 2, 1925. He earned his Bachelor’s degree from the
                      University of Notre Dame in 1929 and later attended the
                      Foreign Seminary in Washington, becoming a priest in 1933.
                    </p>
                    <p>
                      In the same year, Fr. Young embarked on his mission to
                      Bangladesh, engaging in various pastoral and social
                      activities in Dhaka and Mymensingh. At the behest of Most
                      Rev. Lawrence L. Grenar, CSC, Archbishop of Dhaka Diocese,
                      he attended the Coady Institute of St. Francis Xavier
                      University in Canada in 1953 to study co-operatives. In
                      1955, he returned to Dhaka and established “The Christian
                      Co-Operative Credit Union Ltd., Dhaka” (popularly known as
                      “The Dhaka Credit”), significantly improving the lives of
                      the Christian community.
                    </p>
                    <p>
                      Fr. Young’s vision for the Credit Union movement extended
                      across the country, bringing transformative changes to
                      many lives. Today, “The Christian Co-Operative Credit
                      Union Ltd. Dhaka” stands as one of the largest Credit
                      Unions in Bangladesh and South Asia. Fr. Charles J.
                      Young’s contributions have cemented his legacy in the
                      history of the Credit Union Movement in the region.
                      Tragically, he passed away in a road accident on November
                      14, 1988, in Dhaka and was laid to rest at Tejgaon Holy
                      Rosary Church Graveyard. His death anniversary is
                      commemorated annually with great respect.
                    </p>
                    <p>
                      In 2019, led by former President Mr. Babu Markus Gomes,
                      the Executive Committee of The Christian Cooperative
                      Credit Union Limited, Dhaka, decided to establish a
                      foundation to honor Fr. Charles J. Young’s memory and
                      extend development initiatives beyond religious
                      boundaries.
                    </p>
                    <p>
                      On August 17, 2019, the “Fr. Charles J. Young Foundation”
                      was established to implement Fr. Young’s dream through
                      research on co-operatives, educational support for
                      underprivileged and meritorious students, technical
                      vocational education, women’s empowerment, and youth
                      development. This non-political, non-profit, and
                      charitable organization continues to honor Fr. Young’s
                      visionary spirit behind Dhaka Credit.
                    </p>
                    <p>
                      The Father Charles J. Young Foundation is registered with
                      the NGO Affairs Bureau of Bangladesh (Registration No.
                      NGOAB 3382/18-10-2023) and the Registrar of Joint Stock
                      Companies and Firms under Act 1860 of the Bangladesh
                      Government (Registration No. RJSC S-13463/2020).
                    </p>
                  </section> */}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </PublicTemplateLayout>
    </>
  );
}

export default Index;
