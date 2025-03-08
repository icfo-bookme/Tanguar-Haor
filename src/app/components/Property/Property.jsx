"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import propertySummary from "@/utiles/propertySummary";
import IconShow from "@/utiles/IconShow";
import { TailSpin } from "react-loader-spinner";
import { Roboto } from "next/font/google";
import { RangeSlider } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useSearch } from "@/SearchContext";
import getContactNumber from "@/utiles/getContactNumber";
import { FaPhone, FaWhatsapp } from "react-icons/fa";

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function Property() {
  const { searchTerm, setSearchTerm } = useSearch();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [price, setPrice] = useState(10000);
  const [sortOption, setSortOption] = useState("1");
  const [contactNumber, setContactNumber] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const isInitialLoad = useRef(true);

  const lastPropertyRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSearchTerm(data.property);
  };

  // Save scroll position and clicked card index before navigating to the details page
  const handleCardClick = (index) => {
    sessionStorage.setItem("scrollPosition", window.scrollY);
    sessionStorage.setItem("clickedCardIndex", index);
  };

  // Restore scroll position when the page loads and data is ready
  useEffect(() => {
    if (isDataLoaded && !isInitialLoad.current) {
      const savedScrollPosition = sessionStorage.getItem("scrollPosition");
      const clickedCardIndex = sessionStorage.getItem("clickedCardIndex");

      if (savedScrollPosition && clickedCardIndex) {
        setTimeout(() => {
          const cardElement = document.querySelector(
            `[data-index="${clickedCardIndex}"]`
          );
          if (cardElement) {
            window.scrollTo({
              top: parseInt(savedScrollPosition, 10),
              behavior: "auto",
            });
          }
          sessionStorage.removeItem("scrollPosition");
          sessionStorage.removeItem("clickedCardIndex");
        }, 100);
      }
    }
    isInitialLoad.current = false;
  }, [isDataLoaded]);

  // Fetch data when the page changes
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await propertySummary(page);
        if (result.length === 0) {
          setHasMore(false);
        } else {
          setData((prevData) => [...prevData, ...result]);
        }
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching property data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page]);

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

  // Filter data based on searchTerm, price, and sortOption
  useEffect(() => {
    let filtered = data;

    // Filter by searchTerm
    if (searchTerm) {
      filtered = filtered.filter((property) =>
        property.property_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price
    if (price <= 9500) {
      filtered = filtered.filter((property) => {
        if (!property.property_uinit || property.property_uinit.length === 0) {
          return true;
        }

        const prices = property.property_uinit.flatMap(
          (unit) => unit.price?.map((priceObj) => priceObj.price) || []
        );

        return prices.some((p) => p <= price);
      });
    }

    // Sort data
    if (sortOption === "2") {
      filtered = filtered.sort((a, b) => {
        const minA = Math.min(
          ...(a.property_uinit?.flatMap((unit) =>
            unit.price?.map((priceObj) => priceObj.price)
          ) || [Infinity])
        );

        const minB = Math.min(
          ...(b.property_uinit?.flatMap((unit) =>
            unit.price?.map((priceObj) => priceObj.price)
          ) || [Infinity])
        );

        return minA - minB; // Low to High
      });
    } else if (sortOption === "3") {
      filtered = filtered.sort((a, b) => {
        const minA = Math.min(
          ...(a.property_uinit?.flatMap((unit) =>
            unit.price?.map((priceObj) => priceObj.price)
          ) || [0])
        );

        const minB = Math.min(
          ...(b.property_uinit?.flatMap((unit) =>
            unit.price?.map((priceObj) => priceObj.price)
          ) || [0])
        );

        return minB - minA; // High to Low
      });
    }

    // Update filteredData state
    setFilteredData(filtered);
  }, [price, data, sortOption, searchTerm]); // Add searchTerm as a dependency

  return (
    <div
      className={`${roboto.className} bg-white lg:container lg:w-full mx-auto px-4`}
    >
      {/* Filter & Sorting Section */}
      <div className="lg:hidden block mb-[15px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 p-[5px] border rounded-lg shadow-lg w-full lg:w-96 mx-auto"
        >
          <input
            {...register("property")}
            type="text"
            value={searchTerm}
            className="w-full p-2 border rounded-md text-black"
            onChange={(e) => {
              setSearchTerm(e.target.value); // Update searchTerm state
              if (e.target.value === "") {
                setFilteredData(data); // Reset filteredData to show all properties
              }
            }}
            placeholder="Search property"
          />
        </form>
      </div>

      <div className="flex flex-wrap justify-start md:justify-between sm:justify-between items-center mb-5 w-[100%]">
        {/* Price Filter */}
        <div className="flex items-center gap-2 md:w-[50%] w-[100%]">
          <h4 className="text-[12px] sm:text-lg text-[#00026E] font-semibold w-[16%] md:w-[23%] xl:w-[18%]">
            Filter by :
          </h4>
          <h4 className="text-[12px] sm:text-sm hidden md:hidden xl:block font-medium text-[#00026E] w-[21%] xl:w-[16%]">
            Price Range
          </h4>
          <span className="text-[12px] sm:text-sm font-medium text-blue-600 w-[21%] md:[33%] xl:w-[20%]">
            {parseInt(price).toLocaleString()}
            {parseInt(price) > 9500 ? "+" : ""} BDT
          </span>
          <RangeSlider
            id="default-range"
            min={0}
            max={10000}
            step={500}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            tooltip="true"
            tooltipposition="top"
            className="xl:w-[40%] md:[20%] w-[53%] mt-[-18px] appearance-none h-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 justify-center mx-0 md:mx-auto lg:mx-0 sm:mt-[0px] mt-[20px]">
          <h4 className="text-[12px] sm:text-sm md:block hidden font-medium text-[#00026E]">
            Sort Listing:
          </h4>
          <select
            className="md:w-40 w-32 border border-gray-300 rounded-md text-[#00026E] px-3 py-1.5 text-sm focus:ring-blue-400 focus:border-blue-400"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option className="hidden ">Sort By</option>
            <option value="2">Low to High</option>
            <option value="3">High to Low</option>
          </select>
        </div>
      </div>

      {/* Property List */}
      {filteredData.length > 0 ? (
        filteredData.map((property, index) => (
          <div
            key={property.property_id}
            ref={index === filteredData.length - 1 ? lastPropertyRef : null}
            data-index={index}
            className="mb-5"
          >
            <div className="shadow-custom flex flex-col lg:flex-row gap-5 p-5 rounded bg-white">
              <div className="md:min-w-[400px] min-w-0 md:min-h-[300px] min-h-0">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${property.main_img}`}
                  alt={property.property_name}
                  width={500}
                  height={300}
                  className="object-cover w-full md:w-[300px] md:h-[230px] h-[200px] mx-auto"
                />
              </div>

              <div className="flex flex-col w-full pr-4">
                <Link
                  href={`/Property/${property.property_id}`}
                  className="cursor-pointer"
                  onClick={() => handleCardClick(index)}
                >
                  <h1 className="font-heading font-semibold text-lg text-[#00026E] mt-4">
                    {property.property_name}
                  </h1>
                </Link>

                <h1 className="font-normal text-sm text-[#00026E] text-right md:mb-0 mb-[20px]">
                  Starting from <br />
                  <span className="font-bold text-lg text-blue-900">
                    {(() => {
                      const prices =
                        property.property_uinit?.flatMap((unit) =>
                          unit.price?.map((priceObj) => priceObj.price)
                        ) || [];
                      return prices.length > 0
                        ? `${Math.min(...prices)} BDT`
                        : "N/A";
                    })()}
                  </span>
                </h1>

                {property.property_summaries && (
                  <div className="flex flex-col gap-3 -mt-4">
                    {/* Property Summaries */}
                    <div className="flex flex-wrap gap-4">
                      {property.property_summaries
                        .slice(0, 1)
                        .map((summary) => (
                          <div
                            key={summary.id}
                            className="flex items-center text-blue-700"
                          >
                            <IconShow iconName={summary.icons.icon_name} />
                            <span className="ml-2 text-sm text-blue-900">
                              {summary.value}
                            </span>
                          </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div className="flex gap-4 w-full md:w-auto">
                        {property.property_summaries
                          .slice(1, 3)
                          .map((summary) => (
                            <div
                              key={summary.id}
                              className="flex items-center text-gray-700"
                            >
                              <IconShow iconName={summary.icons.icon_name} />
                              <span className="ml-2 text-sm text-gray-900">
                                {summary.value}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                      {property.property_summaries
                        .slice(3, 4)
                        .map((summary) => (
                          <div
                            key={summary.id}
                            className="flex items-center text-gray-700"
                          >
                            <IconShow iconName={summary.icons.icon_name} />
                            <span className="ml-2 text-sm text-blue-900">
                              {summary.value}
                            </span>
                          </div>
                        ))}
                    </div>
                    <div className="flex flex-row md:justify-start justify-center items-center gap-[5px] sm:gap-[25px] mt-[15px]">
                      {/* Buttons */}
                      <div>
                        <Link
                          href={`/Property/${property.property_id}`}
                          style={{
                            background:
                              "linear-gradient(90deg, #313881, #0678B4)",
                          }}
                          className="text-[11px] md:text-[14px] xl:text-[16px] h-[40px] sm:px-4 px-[5px] py-2 text-white font-semibold rounded-md"
                          onClick={() => handleCardClick(index)}
                        >
                          See Details
                        </Link>
                      </div>

                      <div>
                        <Link
                          href={`/Property/${property.property_id}`}
                          style={{
                            background:
                              "linear-gradient(90deg, #313881, #0678B4)",
                          }}
                          className="text-[11px] md:text-[14px] xl:text-[16px] h-[40px] sm:px-4 py-2 px-[5px] text-white font-semibold rounded-md"
                          onClick={() => handleCardClick(index)}
                        >
                          Book Now
                        </Link>
                      </div>
                      <div className="md:hidden block">
                        <Link
                          href={`https://wa.me/${contactNumber[0]?.value}`}
                          className="mx-[10px]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="phone-call md:w-[50px] md:h-[50px] w-[36px] h-[36px] ml-[15px]">
                            <FaPhone className="i md:ml-[17px] md:mt-[17px] mt-[8px] ml-[11px]" />
                          </div>
                        </Link>
                      </div>
                      <div className="md:hidden block">
                        <Link
                          href={`https://wa.me/${contactNumber[0]?.value}`}
                          className="mx-[10px]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="btn-whatsapp-pulse btn-whatsapp-pulse-border md:w-[50px] md:h-[50px] w-[36px] h-[36px] md:mt-[0px] mt-[-5px] ml-[15px]">
                            <FaWhatsapp className="w-[25px] h-[25px] text-white" />
                          </span>
                        </Link>
                      </div>
                    </div>
                    <div className="md:block hidden">
                      <div className="flex justify-start md:justify-start">
                        <div className="flex items-center">
                          <span className="text-black md:text-[16px] text-[14px] font-bold">
                            For instant service:{" "}
                          </span>
                          <div className="mx-[5px] mt-[10px]">
                            <Link
                              href={`https://wa.me/${contactNumber[0]?.value}`}
                              className="mx-[10px]"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="phone-call md:w-[50px] md:h-[50px] w-[36px] h-[36px] ml-[15px]">
                                <FaPhone className="i md:ml-[17px] md:mt-[17px] mt-[8px] ml-[11px]" />
                              </div>
                            </Link>
                          </div>
                          <div>
                            <Link
                              href={`https://wa.me/${contactNumber[0]?.value}`}
                              className="mx-[10px]"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="btn-whatsapp-pulse btn-whatsapp-pulse-border md:w-[50px] md:h-[50px] w-[36px] h-[36px] md:mt-[0px] mt-[-5px] ml-[15px]">
                                <FaWhatsapp className="w-[25px] h-[25px] text-white" />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center">
          <TailSpin height="60" width="60" color="#4fa94d" />
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center my-5">
          <TailSpin height="40" width="40" color="#4fa94d" />
        </div>
      )}
    </div>
  );
}