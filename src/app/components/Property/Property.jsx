"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import propertySummary from "@/utiles/propertySummary";
import IconShow from "@/utiles/IconShow";

import { Hourglass, TailSpin } from "react-loader-spinner";
import { Roboto } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { Raleway } from "next/font/google";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { RangeSlider } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useSearch } from "@/SearchContext";
import getContactNumber from "@/utiles/getContactNumber";

const raleway = Raleway({ subsets: ["latin"], weight: ["800"] });

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

const josefin = Josefin_Sans({ subsets: ["latin"] });
export default function Property() {
  const { searchTerm, setSearchTerm } = useSearch();
  // console.log(searchTerm);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [price, setPrice] = useState(10000);
  const [sortOption, setSortOption] = useState("1");
  const [contactNumber, setContactNumber]=useState([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Update the searchTerm based on input field
    setSearchTerm(data.property);
    // console.log(data.property)
    // console.log(searchTerm)
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await propertySummary();
        setData(result); // Set all data
        setFilteredData(result); // Also set filteredData to all data initially
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getContactNumber();
        setContactNumber(result)
      } catch (error) {
        console.error("Error fetching contact number data:", error);
      }
    }
    fetchData();
  }, []);

  // Apply searchTerm in this useEffect while keeping other filters
  useEffect(() => {
    let filtered = data.filter((property) => {
      // First, filter based on the price range
      if (!property.property_uinit || property.property_uinit.length === 0) {
        return true;
      }

      // Extract prices from units
      const prices = property.property_uinit.flatMap(
        (unit) => unit.price?.map((priceObj) => priceObj.price) || []
      );

      // Show properties where at least one unit has a price <= selected price
      const isWithinPriceRange = prices.some((p) => p <= price);

      // If the property is within the price range, apply the searchTerm filter
      if (isWithinPriceRange) {
        // Apply the searchTerm filter
        if (searchTerm) {
          return property.property_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        }
        return true; // If no searchTerm, include all properties within the price range
      }

      return false; // Exclude properties that are not within the price range
    });

    // Sorting Logic
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

    // After all filters and sorting, update the filtered data
    setFilteredData(filtered);
  }, [price, data, sortOption, searchTerm]); // Add searchTerm to the dependency array

  return (
    <div
      className={`${roboto.className} bg-white lg:container  lg:w-full mx-auto px-4`}
    >
      {/* Filter & Sorting Section */}
      <div className="lg:hidden block mb-[15px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 p-[5px] border rounded-lg shadow-lg w- lg:w-96 mx-auto"
        >
          <input
            {...register("property")}
            type="text"
            value={searchTerm}
            className="w-full p-2 border rounded-md text-black"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search property"
          />
        </form>
      </div>
      <div className="flex flex-wrap justify-center sm:justify-between items-center mb-5 w-[100%]">
        {/* Price Filter */}

        <div className="flex items-center gap-2 md:w-[50%] w-[100%]">
          <h4 className="text-[12px] sm:text-lg text-[#00026E] font-semibold w-[16%] md:w-[23%] xl:w-[18%]">
            Filter by :
          </h4>
          <h4 className="text-[12px] sm:text-sm hidden md:hidden xl:block font-medium text-[#00026E] w-[21%] xl:w-[16%]">
            Price Range
          </h4>
          <span className="text-[12px] sm:text-sm font-medium text-blue-600 w-[21%] md:[33%] xl:w-[20%]">
            {parseInt(price).toLocaleString()} BDT
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
            className="xl:w-[40%] md:[20%]  w-[53%] mt-[-18px] appearance-none h-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 justify-center mx-auto lg:mx-0 sm:mt-[0px] mt-[20px]">
          <h4 className="text-[12px]  sm:text-sm font-medium text-[#00026E]">
            Sort Listing:
          </h4>
          <select
            className="w-40 border border-gray-300 rounded-md text-[#00026E] px-3 py-1.5 text-sm focus:ring-blue-400 focus:border-blue-400"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="2">Low to High</option>
            <option value="3">High to Low</option>
          </select>
        </div>
      </div>

      {/* Property List */}
      {filteredData.length > 0 ? (
        filteredData.map((property) => (
          <div key={property.property_id} className="mb-5">
            {" "}
            {/* ✅ এখানে key প্রপার্টি থাকছে */}
            {/* <Link href={`/Property/${property.property_id}`} prefetch={true}> */}
            <div className=" shadow-custom flex flex-col lg:flex-row gap-5 p-5 rounded bg-white">
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
                <h1
                  className={` font-heading font-semibold text-lg text-[#00026E] mt-4 `}
                >
                  {property.property_name}
                </h1>
                <h1 className="font-normal text-sm text-[#00026E] text-right md:mb-0 mb-[20px]">
                  Starting from <br />
                  <span className="font-bold text-lg text-blue-900">
                    {(() => {
                      const prices =
                        property.property_uinit?.flatMap((unit) =>
                          // console.log("property price",unit),
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
                            className=" flex items-center text-gray-700"
                          >
                            <span className="w-[20px] h-[20px]">
                              <IconShow iconName={summary.icons.icon_name} />
                            </span>

                            <span className="ml-2 text-sm  text-blue-900">
                              {summary.value}
                            </span>
                          </div>
                        ))}
                    </div>
                    <div className="flex flex-row justify-start items-center gap-[5px] sm:gap-[25px] mt-[15px]">
                      <div className="">
                        <Link
                          href={`/Property/${property.property_id}`}
                          style={{
                            background:
                              "linear-gradient(90deg, #313881, #0678B4)",
                          }}
                          className=" text-[11px] md:text-[14px] xl:text-[16px]  h-[40px] sm:px-4 px-[5px] py-2   text-white font-semibold rounded-md"
                        >
                          See Details
                        </Link>
                      </div>

                      <div className=" ">
                        <Link
                          href={`/Property/${property.property_id}`}
                          style={{
                            background:
                              "linear-gradient(90deg, #313881, #0678B4)",
                          }}
                          className="text-[11px] md:text-[14px] xl:text-[16px]  h-[40px] sm:px-4  py-2 px-[5px]  text-white font-semibold rounded-md  "
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                    <div className=" ">
                      <div className="flex justify-start md:justify-start">
                        <div className="flex  items-center">
                          <span className="text-blue-400  font-bold">
                            For instant service:{" "}
                          </span>
                          <div className="mx-[5px]">
                            <Link href={`https://wa.me/${contactNumber[0].value}`} className=" mx-[10px]"  target="_blank" 
  rel="noopener noreferrer">
                              <DotLottieReact
                                className="w-[48px] h-[48px]"
                                loop
                                autoplay
                                src="https://lottie.host/73431dad-3ee8-44e8-9462-f13ad340740e/NdlPKGmae1.json"
                              />
                            </Link>
                            {/* <LuPhoneCall  className="bg-indigo-800 text-[27px] text-white p-[5px] rounded-3xl" /> */}
                          </div>
                          <div>
                            <Link  href={`https://wa.me/${contactNumber[0].value}`} className=" mx-[10px]"  target="_blank" 
  rel="noopener noreferrer">
                              <DotLottieReact
                                className="w-[48px] h-[48px]"
                                loop
                                autoplay
                                src="https://lottie.host/88eab5e0-d032-4b54-a577-3057829e675b/Eua236vSUm.json"
                              />
                            </Link>
                            {/* <FaWhatsapp   className="bg-green-500 text-[27px] p-[5px] text-white rounded-3xl" /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* </Link> */}
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </div>
  );
}
