import PublicTemplateLayout from "@/Layouts/PublicTemplateLayout";
import { Head, useRemember } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState } from "react";

function Index({ auth }) {
  const [donateSectionVisibility, setDonateSectionVisibility] = useState(false);

  const [donateData, setDonateData] = useRemember()

  const openDonateAccount = () => {
    axios
      .get(route('adminDonate.allAccountInfo'))
      .then((response) => {

        setDonateData(response.data.data)
      })
      .catch((error) => {

      })
      .finally(() => {

      });
  }
  return (
    <>
      <PublicTemplateLayout auth={auth}>
        <Head title="Donate" />
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
                  <div className="mb-8 text-center">
                    <div className="font-semibold uppercase text-secondary">
                      Donate Now
                    </div>
                    <div className="text-3xl font-extrabold text-primary">
                      You can make a change
                    </div>
                    <div className="">
                      You can make a difference in a child's life. Sponsor a
                      child today!
                    </div>
                    <div className="flex items-center justify-center mt-4">
                      <div
                        className="px-5 py-3 border border-gray-600 rounded-md text-onPrimary bg-primary hover:cursor-pointer hover:bg-primaryVariant"
                        onClick={() => {
                          setDonateSectionVisibility(!donateSectionVisibility);
                          openDonateAccount()
                        }}
                      >
                        Donate Now
                      </div>
                    </div>
                  </div>
                  <section
                    className={`flex ${donateSectionVisibility
                        ? "translate-x-0"
                        : "translate-x-[-9999px]"
                      } flex-col items-center justify-center gap-4 transition-all md:flex-row`}
                  >
                    {donateData?.map((data, index) => {
                      return (
                        <div key={index} className="flex items-center justify-center h-40 p-6 border rounded border-secondary">
                          <div className="">
                            <div className="">
                              <strong>Accounts Name: </strong> {data.accounts_name}
                            </div>
                            <div className="">
                              <strong>Number: </strong> {data.account_number}

                            </div>
                            <div className="">
                              <strong>Bank Name: </strong> {data.company_name}

                            </div>
                            <div className="">
                              <strong>Branch: </strong>
                              {data.branch_name}

                            </div>
                          </div>
                        </div>
                      )

                    })}
                  </section>
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
