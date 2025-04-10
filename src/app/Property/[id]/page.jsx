"use client";
import { use, useEffect, useState, useRef } from "react";
import ContactForm from "@/app/components/tour/ContactForm/ContactForm";
import getFacilities from "@/services/tour/getFacilities";
import getPropertyDetails from "@/services/tour/getPropertyDetails";
import { getPropertyImages } from "@/services/tour/getPropertyImages";
import ImageCarousel from "@/services/tour/ImageCarousel";
import { IoLocation } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getPropertyPackages from "@/services/tour/getPropertyPackages";
import { FaWhatsapp } from "react-icons/fa";
import { Roboto } from "next/font/google";
import Image from "next/image";
import getContactNumber from "@/services/tour/getContactNumber";
import Link from "next/link";
import AccordionBookMe from "@/services/tour/Accordion";

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function Page({ params }) {
  const { id } = use(params);

  const [propertyImages, setPropertyImages] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [propertyFacilities, setPropertyFacilities] = useState([]);
  const [propertyPackages, setPropertyPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contactNumber, setContactNumber] = useState([]);
  const [isFixed, setIsFixed] = useState(false);
  const accordionRef = useRef(null); // Ref for the Accordion section
  const [accordionWidth, setAccordionWidth] = useState("auto"); // Dynamic width for the fixed element
  console.log(propertyDetails);
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const headerHeight = 80; // Height of your header
      if (scrollY > headerHeight) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate the width of the Accordion section
  useEffect(() => {
    if (accordionRef.current) {
      const width = accordionRef.current.offsetWidth;
      setAccordionWidth(`${width}px`);
    }
  }, [isFixed]);

  // Fetch property data
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

  // Fetch contact number
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getContactNumber();
        setContactNumber(result);
      } catch (error) {
        console.error("Error fetching contact number data:", error);
      }
    }
    fetchData();
  }, []);
console.log(propertyPackages)
  return (
    <div>
      <div
        className={`${roboto.className} pt-[80px] bg-[#EBF0F4] pb-[20px] md:pb-[200px] `}
      >
        <div className="container w-[98%] md:w-[85%] mx-auto">
          <div className="grid-cols-1 rounded gap-8 lg:grid pr-1 pt-1">
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
                    <p className="flex text-black items-center">
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
                <div className="flex bg-gray-200 h-96 justify-center w-full items-center">
                  <span className="text-gray-500">No images available</span>
                </div>
              )}
            </div>
          </div>

          {/* Packages Section */}
          <div className="my-[30px]">
            <h1
              className={`font-heading text-blue-700 text-[32px] font-bold my-[32px]`}
            >
              Packages:
            </h1>
            <div className="flex flex-wrap md:justify-start justify-around gap-0 lg:gap-6 md:mx-[-10px] md:px-0 mx-0 px-[10px] xl:flex-nowrap">
              {loading ? (
                <div>Loading...</div>
              ) : (
                propertyPackages?.slice(0, 4).map((pkg, dd) => (
                  <div
                    key={pkg.unit_id}
                    className={`${
                      propertyPackages?.length < 4
                        ? "lg:max-w-[25%] max-w-[80%] "
                        : "max-w-[100%]"
                    } relative z-10 lg:my-0 my-[10px] md:mx-[10px] bg-white shadow-xl rounded-lg overflow-visible`}
                  >
                    {/* Discount Badge */}
                    {(pkg?.discount?.discount_percent > 0 || pkg?.discount?.discount_amount > 0) && (
  <div className="flex flex-col bg-red-700 h-14 justify-center rounded-full shadow-md text-white text-xs w-14 -right-3 -top-4 absolute font-semibold items-center py-2 z-40">
    <span>
      {pkg.discount.discount_percent > 0 
        ? `${Math.floor(pkg.discount.discount_percent)}%`
        : `${Math.floor(pkg.discount.discount_amount)} TK`}
    </span>
    <span className="text-[10px]">OFF</span>
  </div>
)}
                    {/* Package Content */}
                    <div className="flex flex-col h-full items-center mx-auto">
                      <div className="block max-h-[60%] overflow-hidden">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${pkg.mainimg}`}
                          alt={pkg.unit_id}
                          fill
                          className="rounded-t-lg w-[100%] lg:max-h-[55%] max-h-[55%] md:max-h-[50%] xl:max-h-[43%]"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-[12px] shadow-lg lg:mt-[180px] md:mt-[140px] mt-[210px] xl:mt-[180px]">
                        <h2
                          className={`font-heading text-[17px] font-bold text-blue-900 pb-2`}
                        >
                          {pkg.unit_name}
                        </h2>
                        <p
                          className={`${roboto.className} text-gray-700 text-[16px]`}
                        >
                          Unit Type: {pkg.unit_type} | Person Allowed:{" "}
                          {pkg.person_allowed} | Additional Bed:{" "}
                          {pkg?.additionalbed === 1
                            ? "| Additional Bed: Available"
                            : pkg?.additionalbed === 0
                            ? ""
                            : ""}
                        </p>
                        <div className="flex justify-start items-center">
                          <div
                            className={`${roboto.className} flex gap-2 mt-3 mb-4`}
                          >
                            <Link
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`tel:${contactNumber?.Phone}`}
                            >
                              <div className="flex border border-blue-950 justify-center rounded-full text-black text-center text-sm font-heading items-center px-3 py-1 sm:w-[90px]">
                                Call Now
                              </div>
                            </Link>
                            <Link
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`https://wa.me/${contactNumber?.Phone}`}
                            >
                              <div className="flex border border-blue-950 justify-center rounded-full text-black text-sm font-heading gap-2 items-center px-3 py-1 sm:w-[120px]">
                                <FaWhatsapp className="text-[16px] text-green-500" />
                                Book Now
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className={`${roboto.className}`}>
  {pkg.price?.length > 0 ? (
    <p className="text-[16px] text-blue-950 font-semibold">
      <span>Price: </span>
      {pkg?.discount ? (
        (() => {
          const discount = pkg.discount;
          const hasAmountDiscount = discount?.discount_amount > 0;
          const hasPercentDiscount = discount?.discount_percent > 0;
          const hasAnyDiscount = hasAmountDiscount || hasPercentDiscount;
          
          let discountedPrice = pkg.price[0].price;
          
          if (hasAmountDiscount) {
            discountedPrice = Math.floor(pkg.price[0].price - discount.discount_amount);
          } 
          else if (hasPercentDiscount) {
            discountedPrice = Math.floor(pkg.price[0].price * (1 - (discount.discount_percent / 100)));
          }
          
          return (
            <>
              {hasAnyDiscount ? (
                <>
                  <span className="line-through text-red-500 mr-1">
                    {Math.floor(pkg.price[0].price)} TK
                  </span>
                  <span className="">
                    {discountedPrice} TK
                    <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      {hasAmountDiscount 
                        ? `${discount.discount_amount} TK OFF`
                        : `${discount.discount_percent}% OFF`}
                    </span>
                  </span>
                </>
              ) : (
                <span>
                  {Math.floor(pkg.price[0].price)} TK
                </span>
              )}
            </>
          );
        })()
      ) : (
        // Regular price without discount
        <span>
          {Math.floor(pkg.price[0].price)} TK
        </span>
      )}
      {/* Per person indicator */}
      <span className="text-gray-500 text-[14px] ml-1">(Per person)</span>
    </p>
  ) : (
    // Price not available
    <p className="text-[15px] text-red-500">
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

          {/* Sticky Accordion Section */}

          <div className="bg-white p-[15px] rounded-lg top-[80px]">
            <div className="">
              <div className="w-full">
                <div className="grid-cols-3 rounded gap-10 lg:grid">
                  <div className="col-span-2">
                    <AccordionBookMe facilities={propertyFacilities} />
                  </div>

                  <div className="col-span-1 p-[10px] rounded-lg shadow-lg">
                    <div>
                      <h1
                        className={`font-heading text-base shadow-2xl bg-white font-bold text-blue-900 md:mt-0 mt-[15px]`}
                      >
                        Get consultancy/Get a call
                      </h1>
                      <ContactForm propertyDetails={propertyDetails} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add padding to prevent overlapping */}
          {isFixed && (
            <div style={{ height: accordionRef.current?.offsetHeight }} />
          )}
        </div>
        {/* Toast container*/}
        <ToastContainer />
      </div>
    </div>
  );
}
