import PublicTemplateLayout from "@/Layouts/PublicTemplateLayout";
import { Carousel } from 'react-responsive-carousel';
import { motion } from "framer-motion";
import { PhotoProvider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Head, usePage } from "@inertiajs/react";
import {  useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function Index({ auth }) {
  const { gallery } = usePage().props;  
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentAttachments, setCurrentAttachments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleImageClick = (attachments, index) => {
    setCurrentAttachments(attachments);
    setCurrentIndex(index);
    setShowCarousel(true);
  };
  return (
      <PublicTemplateLayout auth={auth}>
         <Head title="Gallery" />
        <div className="">
          <div className="container mx-auto">
            <div className="mb-10 text-center">
              <div className="font-semibold uppercase text-secondary">
                Our activities
              </div>
              <div className="text-3xl font-extrabold text-primary">
                Do you curious, how and where we work?
              </div>
              <div className="">
                We have a collaborative and supportive culture that encourages
                teamwork, innovation, and learning.
              </div>
            </div>
          </div>
          {!gallery || !gallery.data || gallery.data.length === 0 ? 
            <section className="flex flex-col items-center justify-center bg-background text-onSurface">
              <div className="container mx-auto">
                <div className="py-16 border border-dashed border-secondary bg-surface text-onSurface">
                  <div className="text-center">
                    <h1 className="text-3xl font-extrabold md:text-5xl lg:text-7xl">
                      Gallery
                    </h1>
                    <p>No Gallery has been published yet.</p>
                  </div>
                </div>
              </div>
            </section> 
          :
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
              <div className="w-full" style={{ height: window.innerHeight - 360 }}>
                <PhotoProvider>
                  <div className="mx-auto pt-8 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8 relative">
                    {gallery?.data?.map((galleryImage, index) => (
                      <div key={index} className="cursor-pointer" onClick={() => handleImageClick(galleryImage.attachments, index)}>
                        <div className="overflow-hidden border-2 border-primary rounded-md transition-transform duration-300 transform hover:scale-105">
                          <img
                            src={galleryImage.attachment_url}
                            alt={galleryImage.title || 'Image not found'}
                            className="w-full h-auto"
                          />
                        <h2 className="absolute bg-primary bottom-0 w-full opacity-70 text-white" >{galleryImage.title}</h2>
                        </div>
                      </div>
                    ))}
                    {showCarousel && (
                      <div className="fixed  inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
                        
                        <div className=" w-full max-w-4xl p-4 bg-white rounded-lg">
                        <button
                          className="absolute top-4 right-4 text-white bg-red-500 p-2 rounded-full focus:outline-none"
                          onClick={() => setShowCarousel(false)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                          <Carousel
                            selectedItem={currentIndex}
                            showThumbs={false}
                            infiniteLoop
                            className="rounded-md overflow-hidden"
                          >
                            {currentAttachments.map((attachment, attachmentIndex) => (
                              <div key={attachmentIndex} className="rounded-md">
                                <img
                                  src={attachment.attachment_url}
                                  alt={attachment.title || 'Image not found'}
                                  className="w-full h-auto rounded-md"
                                />
                              </div>
                            ))}
                          </Carousel>
                        </div>
                      </div>
                    )}
                  </div>
                </PhotoProvider>
              </div>
            </div>
          </motion.div>}
        </div>
      </PublicTemplateLayout>
  );
}

export default Index;
