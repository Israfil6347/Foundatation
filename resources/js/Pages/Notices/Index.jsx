import PublicTemplateLayout from "@/Layouts/PublicTemplateLayout";
import { Head, usePage, useRemember } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Modal from "@/Components/Modal.jsx";
import originalLogo from "../../../assets/brand/logo_original.png";

function Index({ auth }) {
   const [noticesData,setNoticeData]= useRemember();

   const [openDialogerForNotice,setOpenDialogerForNotice]=useRemember(false);
   const [openNoticeData,setOpenNoticeData]=useRemember();

  const openDonateAccount =()=>{
    axios
        .get(route('adminNotices.adminNoticeView'))
        .then((response) => {
        
          setNoticeData(response.data.data)
        })
        .catch((error) => {
          
        })
        .finally(() => {

        });
  }
  useEffect(()=>{
    openDonateAccount();
  },[])



  return (
    <>
      <PublicTemplateLayout auth={auth}>

        <Modal 
          maxWidth={"XXl"}
          onClose={()=>{
            setOpenDialogerForNotice(false)
          }}
          show={openDialogerForNotice} >
          <div className="">
              <div className="bg-background p-6">
                <div className="hover:animate-swing flex w-full flex-col items-center hover:cursor-pointer">
                  <img src={originalLogo} alt="" className="w-28"/>
                  <h3 className="font-bold text-primary">
                  Notice
                  </h3>
                </div>
              </div>
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                <div>
                  {openNoticeData?.attachment_mime === "image/jpeg" ||openNoticeData?.attachment_mime === "image/png"?             
                  <div className="w-1/2">
                    <img className="rounded-lg" src={openNoticeData?.attachment_url} alt=""/>
                  </div>:
                    <div className="pt-1 text-xs group-hover:cursor-pointer">
                      <a
                        download
                        href={openNoticeData?.attachment_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-light hover:underline "
                      >
                        Download PDF
                    </a>
                  </div> }
                  
                </div>
                <div>
                  <h2 className="text-xl font-bold py-2">Title: {openNoticeData?.title}</h2>
                  <h3 className="text-sm py-2 font-semibold">Subtitle: {openNoticeData?.subtitle}</h3>
                  <div
                        className="max-w-full prose text-justify leading-loose"
                        dangerouslySetInnerHTML={{
                            __html: openNoticeData?.body ?? '',
                        }}
                      >
                    </div>
                </div>
                <div>
                </div>             
              </div>
              <div className="flex w-full justify-center gap-4 bg-background p-4">
              <button
              onClick={()=>{
                setOpenDialogerForNotice(false)
              }}
              className="w-2/5  rounded border bg-primary py-2 font-semibold uppercase text-onPrimary hover:bg-primaryVariant">close</button>
              </div>
          </div>
        </Modal>
          <Head title="Notice" />
        <motion.div>
          <div className="container flex flex-col gap-6 mx-auto text-left md:text-justify lg:text-justify">
            <div className="mb-10 text-center">
              <div className="font-semibold uppercase text-secondary">
                STAY UP TO DATE
              </div>
              <div className="text-3xl font-extrabold text-primary"></div>
              <div className=""></div>
            </div>

            {noticesData?.length === 0? 
             <section className="flex flex-col items-center justify-center bg-background text-onSurface">
              <div className="container mx-auto">
                <div className="py-16 border border-dashed border-secondary bg-surface text-onSurface">
                  <div className="text-center">
                    <h1 className="text-3xl font-extrabold md:text-5xl lg:text-7xl">
                      Notices
                    </h1>
                    <p>No notices has been published yet.</p>
                  </div>
                </div>
              </div>
            </section> :
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
             {noticesData?.map((data, index)=>{
              return (
                    <motion.div
                    onClick={()=>{
                      setOpenDialogerForNotice(true)
                      setOpenNoticeData(data)
                    }}
                      initial="offScreen"
                      animate="onScreen"
                      className="flex gap-4 px-6 py-4 divide-x rounded shadow-sm group bg-surface text-onSurface hover:cursor-pointer hover:shadow "
                    >
                      <div className="flex items-center justify-center">
                        {data?.attachment_mime === "image/jpeg"? <i class="text-3xl fa-solid fa-image text-primary"></i>: <i className="text-3xl fa-solid fa-file-pdf text-primary "></i>}


                      </div>
                      <div className="px-4 divide-y">
                        <div className="">
                          <p className="font-bold text-primary ">
                            {data?.title}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
            })}
            </div> }
          </div>
        </motion.div>
      </PublicTemplateLayout>
    </>
  );
}

export default Index;
