"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import propertySummary from "@/utiles/propertySummary";
import IconShow from "@/utiles/IconShow";

export default function Property() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [price, setPrice] = useState(1000);
  const [sortOption, setSortOption] = useState("1");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await propertySummary();
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = data.filter((property) => {
      const prices = property.property_uinit?.flatMap((unit) =>
        unit.price?.map((priceObj) => priceObj.price)
      ) || [];
      return prices.some((p) => p <= price);
    });

    // Sorting Logic
    if (sortOption === "2") {
      filtered = filtered.sort((a, b) => {
        const minA = Math.min(...(a.property_uinit?.flatMap((unit) =>
          unit.price?.map((priceObj) => priceObj.price)
        ) || [Infinity]));

        const minB = Math.min(...(b.property_uinit?.flatMap((unit) =>
          unit.price?.map((priceObj) => priceObj.price)
        ) || [Infinity]));

        return minA - minB; // Low to High
      });
    } else if (sortOption === "3") {
      filtered = filtered.sort((a, b) => {
        const minA = Math.min(...(a.property_uinit?.flatMap((unit) =>
          unit.price?.map((priceObj) => priceObj.price)
        ) || [0]));

        const minB = Math.min(...(b.property_uinit?.flatMap((unit) =>
          unit.price?.map((priceObj) => priceObj.price)
        ) || [0]));

        return minB - minA; // High to Low
      });
    }

    setFilteredData(filtered);
  }, [price, data, sortOption]);

  return (
    <div className="container lg:w-full w-screen mx-auto px-4">
      {/* Filter & Sorting Section */}
      <div className="flex flex-wrap justify-between items-center mb-5">
        {/* Price Filter */}
        <div className="flex items-center gap-2">
          <h4 className="text-lg text-[#00026E] font-semibold">Filter by :</h4>
          <h4 className="text-sm hidden md:block font-medium text-[#00026E]">
            Price Range:
          </h4>
          <span className="text-sm font-medium text-blue-600">
            {parseInt(price).toLocaleString()} BDT
          </span>
          <input
            className="w-40 appearance-none h-2 rounded-lg bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="range"
            min="0"
            max="1000"
            step="50"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ WebkitAppearance: "none" }}
          />
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 justify-center mx-auto lg:mx-0">
          <h4 className="text-sm font-medium text-[#00026E]">Sort Listing:</h4>
          <select
            className="w-40 border border-gray-300 rounded-md text-[#00026E] px-3 py-1.5 text-sm focus:ring-blue-400 focus:border-blue-400"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            {/* <option value="1">Popularity</option> */}
            <option value="2">Low to High</option>
            <option value="3">High to Low</option>
          </select>
        </div>
      </div>

      {/* Property List */}
      {filteredData.length > 0 ? (
        filteredData.map((property) => (
          <div key={property.property_id} className="mb-5">
            <Link href={`/Property/${property.property_id}`} prefetch={true}>
              <div className="shadow-custom flex flex-col md:flex-row gap-5 p-5 rounded bg-white">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${property.main_img}`}
                  alt={property.property_name}
                  width={600}
                  height={300}
                  className="object-cover w-full md:w-[300px] md:h-[230px] h-[200px] mx-auto"
                />
                <div className="flex flex-col w-full pr-4">
                  <div className="flex justify-between items-center w-full">
                    <h1 className="font-semibold text-lg text-[#00026E]">
                      {property.property_name}
                    </h1>
                    <h1 className="font-normal text-sm text-[#00026E] text-right">
                      Starting from <br />
                      <span className="font-bold text-lg text-blue-900">
                        {(() => {
                          const prices = property.property_uinit?.flatMap((unit) =>
                            unit.price?.map((priceObj) => priceObj.price)
                          ) || [];
                          return prices.length > 0 ? `${Math.min(...prices)} BDT` : "N/A";
                        })()}
                      </span>
                    </h1>
                  </div>
                  {property.property_summaries && (
                    <div className="flex flex-col gap-3 mt-3">
                      <div className="flex flex-wrap gap-4">
                        {property.property_summaries.slice(0, 1).map((summary) => (
                          <div key={summary.id} className="flex items-center text-blue-700">
                            <IconShow iconName={summary.icons.icon_name} />
                            <span className="ml-2 text-sm text-blue-900">{summary.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap justify-between items-center gap-4">
                        <div className="flex gap-4 w-full md:w-auto">
                          {property.property_summaries.slice(1, 3).map((summary) => (
                            <div key={summary.id} className="flex items-center text-gray-700">
                              <IconShow iconName={summary.icons.icon_name} />
                              <span className="ml-2 text-sm text-gray-900">{summary.value}</span>
                            </div>
                          ))}
                        </div>
                        <button className="px-4 py-2 mt-3 md:mt-0 bg-blue-900 text-white font-semibold rounded-md w-full md:w-auto">
                          Book Now
                        </button>
                      </div>
                      <div className="flex gap-4 w-full md:w-auto">
                        {property.property_summaries.slice(3, 4).map((summary) => (
                          <div key={summary.id} className="flex items-center text-gray-700">
                            <IconShow iconName={summary.icons.icon_name} />
                            <span className="ml-2 text-sm text-blue-900">{summary.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No properties found within this price range.</div>
      )}
    </div>
  );
}