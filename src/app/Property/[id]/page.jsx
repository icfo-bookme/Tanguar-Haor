"use client";
import { use, useEffect, useState } from "react";
import ContactForm from "@/app/components/ContactForm/ContactForm";
import Accordion from "@/utiles/Accordion";
import getFacilities from "@/utiles/getFacilities";
import getPropertyDetails from "@/utiles/getPropertyDetails";
import { getPropertyImages } from "@/utiles/getPropertyImages";
import ImageCarousel from "@/utiles/ImageCarousel";
import { IoLocation } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getPropertyPackages from "@/utiles/getPropertyPackages";
import { FaWhatsapp } from "react-icons/fa";
import { Josefin_Sans } from "next/font/google";
import { Roboto } from "next/font/google";
import { Raleway } from "next/font/google";
import Image from "next/image";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";

const raleway = Raleway({ subsets: ["latin"] });

const josefin = Josefin_Sans({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });
export default function Page({ params }) {
  const { id } = use(params); // ✅ `use(params)` ব্যবহার করে Promise আনর‍্যাপ করা হয়েছে

  const [propertyImages, setPropertyImages] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [propertyFacilities, setPropertyFacilities] = useState([]);
  const [propertyPackages, setPropertyPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const setSearchTerm = "tanguar haur";
  const searchTerm = "tanguar haur";
  const [activeTab, setActiveTab] = useState("Overview");
  console.log(propertyPackages);
  useEffect(() => {
    async function fetchData() {
      try {
        const [images, details, facilities, packages] = await Promise.all([
          getPropertyImages(id),
          getPropertyDetails(id),
          getFacilities(id),
          getPropertyPackages(id),
        ]);
        setPropertyImages(images);
        setPropertyDetails(details);
        setPropertyFacilities(facilities);
        setPropertyPackages(packages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setActiveTab("Overview");
  }, []);
  return (
    <div>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className={`${roboto.className} pt-[80px] bg-[#EBF0F4] pb-[20px]`}>
        <div className=" container mx-auto w-[98%] md:w-[85%]">
          <div className="lg:grid grid-cols-1  rounded gap-8 pr-1 pt-1">
            {/* Property Details */}
            <div className="col-span-1 p-2">
              {loading ? (
                <div>Loading...</div>
              ) : (
                propertyDetails?.map((property, index) => (
                  <div key={index}>
                    <h2
                      className={`font-heading text-xl text-blue-900 font-bold`}
                    >
                      {property.property_name}
                    </h2>
                    <p className="flex items-center">
                      <strong>
                        <IoLocation />
                      </strong>{" "}
                      {property.address}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Image Carousel */}
            <div>
              {propertyImages?.length > 0 ? (
                <ImageCarousel propertyImages={propertyImages} />
              ) : (
                <div className="w-full h-96 bg-gray-200 flex justify-center items-center">
                  <span className="text-gray-500">No images available</span>
                </div>
              )}
            </div>
          </div>
          {/* <h1 className={`font-heading  text-[32px] font-bold my-[32px]`}>
             Packages:
          </h1> */}
          <div className="my-[30px] ">
            <div className="flex  mx-0 md:mx-[-10px] flex-wrap  lg:flex-nowrap md:px-0 px-[10px]">
              {loading ? (
                <div>Loading...</div>
              ) : (
                propertyPackages?.slice(0, 4).map((pkg, dd) => (
                  <div
                    key={pkg.unit_id}
                    className="relative z-10 lg:my-0 my-[10px] md:mx-[10px] bg-white shadow-xl rounded-lg overflow-visible"
                  >
                    {/* Discount Badge */}

                    {pkg.discount?.length > 0 && (
                      <div className="absolute text-white z-40 -top-4 -right-3 bg-red-700 py-2 rounded-full text-xs font-semibold w-14 h-14 flex flex-col items-center justify-center shadow-md">
                        <span>
                          {Math.floor(pkg.discount[0].discount_percent)}%
                        </span>
                        <span className="text-[10px]">OFF</span>
                      </div>
                    )}

                    {/* Package Content */}
                    <div className="flex flex-col items-center pt-[10px] mx-auto">
                      <div className=" mb-[100px]">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${pkg.mainimg}`}
                          alt={pkg.unit_id}
                          fill
                          className="object-cover md:max-h-[45%] max-h-[40%] lg:max-h-[50%] max-w-[100%] rounded-t-lg "
                        />
                      </div>
                      <div className="p-[12px] flex flex-col flex-1 shadow-lg">
                        <h2
                          className={`font-heading text-[17px] font-bold text-blue-900 pb-2`}
                        >
                          {pkg.unit_name}
                        </h2>
                        <p
                          className={`${roboto.className} text-gray-600 text-[16px]`}
                        >
                          {pkg.unit_type} | Person Allowed: {pkg.person_allowed}{" "}
                          | Additional Bed: {pkg.additionalbed}
                        </p>
                        <div className="flex justify-start items-center">
                          <div
                            className={`${roboto.className} flex gap-2 mt-3 mb-4`}
                          >
                            <div className="font-heading px-3 text-black flex items-center justify-center py-1 text-sm border border-blue-950 rounded-full sm:w-[90px] text-center">
                              Call Now
                            </div>
                            <div className="font-heading px-3 py-1 text-black text-sm border border-blue-950 rounded-full sm:w-[120px] flex items-center justify-center gap-2">
                              <FaWhatsapp className=" text-green-500 text-[16px]" />
                              Book Now
                            </div>
                          </div>
                        </div>
                        <div className={`${roboto.className}`}>
                          {pkg.price?.length > 0 ? (
                            <p className="text-blue-950 text-[16px] font-semibold">
                              Price: {pkg.price[0].price} BDT
                            </p>
                          ) : (
                            <p className="text-red-500 text-[16px]">
                              Price: Not Available
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="bg-white p-[15px] rounded-lg ">
            <div className=" flex gap-x-[20px] md:gap-x-[40px]  font-semibold text-blue-900 overflow-x-auto flex-nowrap dark:bg-gray-100 dark:text-gray-800">
              {["Summary", "Description"].map((tab) => (
                <a
                  key={tab}
                  href={`#${tab.toLowerCase()}`}
                  onClick={() => handleTabClick(tab)}
                  className={`bg-white flex font-bold items-center flex-shrink-0 cursor-pointer py-2 border-b-4 ${
                    activeTab === tab
                      ? "border-blue-500 bg-white text-[#00026E] md:mr-5"
                      : "border-transparent  dark:border-gray-300 dark:text-gray-600 md:mr-5"
                  }`}
                >
                  {tab}
                </a>
              ))}
            </div>
            <hr />
            {/* Property Packages */}
            <div className="">
              <div className="w-full  mt-[30px] ">
                <div className="lg:grid grid-cols-3 gap-10 rounded">
                  {
                    <>
                      <div className="col-span-2 ">
                        <Accordion
                          facilities={propertyFacilities}
                          activeTab={activeTab}
                          href={`#${activeTab.toLowerCase()}`}
                        />
                      </div>
                      {/* {loading ? <div>Loading...</div> : <PropertyPackages packages={propertyPackages} />} */}
                    </>
                  }
                  <div className="col-span-1 p-[10px] rounded-lg shadow-lg">
                    <div>
                      <h1
                        className={`font-heading text-base shadow-2xl bg-white font-bold text-blue-900 md:mt-0 mt-[15px]`}
                      >
                        Get a Call
                      </h1>
                      <ContactForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
}
