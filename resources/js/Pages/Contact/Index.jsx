import PublicTemplateLayout from "@/Layouts/PublicTemplateLayout";
import { Head, useRemember } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useEffect } from "react";

function Index({ auth }) {

  const [settingData, setSettingData] = useRemember()
  useEffect(() => {
    axios
      .get(route('settings.getPublicSetting'))
      .then((response) => {
        setSettingData(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {

      });
  }, [])


  console.log(settingData)

  return (
    <>
      <PublicTemplateLayout auth={auth}>
        <Head title="Contact" />
        <div className="">
          <div className="container mx-auto">
            <div className="mb-10 text-center">
              <div className="font-semibold uppercase text-secondary">
                Contact Us
              </div>
              <div className="text-3xl font-extrabold text-primary"></div>
              <div className="">
                Please email us if you have any questions or remarks regarding
                our work. Below you will find our other contact details.
              </div>
            </div>
          </div>
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
              <div className="grid grid-cols-1 gap-10 p-4 border border-dashed rounded border-secondary bg-surface md:grid-cols-2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d513110.32154891297!2d90.14414987777333!3d23.817822431387203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1712487302183!5m2!1sen!2sbd"
                  title="map"
                  className="w-full aspect-video"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="flex flex-col items-start justify-center">
                  <div className="flex flex-col items-center w-full">
                    <div className="w-full h-full px-5 py-2 divide-y divide-secondary">
                      <div className="flex items-center gap-2 font-bold">
                        <i className="fa-solid fa-map-location-dot"></i>
                        <span>Address</span>
                      </div>
                      <div className="pt-1 text-sm">
                        {settingData?.address}
                      </div>
                    </div>

                    <div className="w-full h-full px-5 py-2 divide-y divide-secondary">
                      <div className="flex items-center gap-2 font-bold">
                        <i className="fa-solid fa-at"></i>
                        <span>Email</span>
                      </div>
                      <div className="pt-1 text-sm">
                        {settingData?.customer_support_email}
                        {/* info@fryoungfoundation.org */}
                      </div>
                    </div>

                    <div className="w-full h-full px-5 py-2 divide-y divide-secondary">
                      <div className="flex items-center gap-2 font-bold">
                        <i className="fa-solid fa-phone-volume"></i>
                        <span>Phone</span>
                      </div>
                      <div className="pt-1 text-sm">
                        {settingData?.technical_support_contact}, {settingData?.customer_support_contact}
                        {/* +8801321-169723, +8801321-169700 */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </PublicTemplateLayout>
    </>
  );
}

export default Index;
