import Banner from "@/Template/Banner";
import Footer from "@/Template/Footer";
import Header from "@/Template/Header";
import { useEffect, useState } from "react";
import home from "../../assets/images/banner-images/children_3.jpg";
import faq from "../../assets/images/banner-images/children_4.jpg";
import gallery from "../../assets/images/banner-images/children_6.jpg";
import publications from "../../assets/images/banner-images/children_8.jpg";
import donate from "../../assets/images/banner-images/donate.jpg";
import contact from "../../assets/images/banner-images/education_2.jpg";
import about from "../../assets/images/banner-images/education_4.jpg";
import notices from "../../assets/images/banner-images/holli_2.jpg";
import { useRemember } from "@inertiajs/react";
import axios from "axios";

export default function PublicTemplateLayout({ children, auth }) {
  const [OpenTopNav, setOpenTopNav] = useState(false);
  const [scrollFromTop, setScrollFromTop] = useState(false);
  const [bannerImage, setBannerImage] = useState(home);
  const [settingData, setSettingData] = useRemember()

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window?.scrollY > 60 ? setScrollFromTop(true) : setScrollFromTop(false);
    });

    scrollToTop();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // bannercode

  const location = window.location;
  const urlArrays = decodeURIComponent(location.pathname)
    .replace(/[_-]/g, " ")
    .split("/");

  useEffect(() => {
    if (urlArrays[1] === "about") {
      setBannerImage(about);
    }
    if (urlArrays[1] === "donate") {
      setBannerImage(donate);
    }
    if (urlArrays[1] === "publications") {
      setBannerImage(publications);
    }

    if (urlArrays[1] === "contact") {
      setBannerImage(contact);
    }

    if (urlArrays[1] === "faq") {
      setBannerImage(faq);
    }

    if (urlArrays[1] === "gallery") {
      setBannerImage(gallery);
    }

    if (urlArrays[1] === "notices") {
      setBannerImage(notices);
    }
  }, [urlArrays]);


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

  return (
    <>
      <div className="relative flex flex-col min-h-screen overflow-hidden font-sans-serif bg-background text-onBackground">
        <Header
          scrollFromTop={scrollFromTop}
          OpenTopNav={OpenTopNav}
          setOpenTopNav={setOpenTopNav}
          urlArrays={urlArrays}
          settingData={settingData}
        />
        <Banner bannerImage={bannerImage} urlArrays={urlArrays} />

        <div className="px-4 py-10 md:px-2 md:py-14 lg:px-0 lg:py-20">
          {children}
        </div>

        <div className="fixed flex flex-col items-center justify-center h-12 transition-all duration-300 rounded-l-full shadow-md bg-surface bottom-60 -right-44 hover:right-0 hover:scale-110 hover:cursor-pointer hover:shadow-lg">
          <button
            className="flex items-center justify-center gap-3 pl-4 pr-5"
            onClick={() => {
              window.open(
                `${settingData?.messenger_link}`,
                "_blank",
                "noreferrer"
              );
            }}
          >
            <i className="text-2xl text-blue-400 fa-brands fa-facebook-messenger fa-bounce"></i>
            <div className="text-onSurface ">Chat with Messenger</div>
          </button>
        </div>

        <Footer auth={auth} settingData={settingData} />
      </div>
    </>
  );
}
