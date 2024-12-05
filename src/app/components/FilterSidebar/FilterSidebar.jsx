"use client";
import { RiArrowLeftDoubleLine, RiArrowUpDownLine } from "react-icons/ri";
import { FaDollarSign } from "react-icons/fa";
import { useState } from "react";

const FilterSidebar = () => {
  const [price, setPrice] = useState(1000); // Default price value
  const [duration, setDuration] = useState(""); // Selected duration

  return (
    <div className="col-span-1 xl:col-span-3 w-full bg-white">
      <div className="px-2  w-full  bg-white flex flex-col">
        {/* Close Button */}
        <div className="block xl:hidden flex justify-end mb-4">
          <button className="text-gray-600 hover:text-gray-900">
            <RiArrowLeftDoubleLine className="text-xl" />
          </button>
        </div>
        <div className="text-[#00026E] text-base font-semibold pb-5">
          <h1>Destination: 26 places found </h1>
        </div>
        {/* Heading */}
        <div className="flex  gap-2 mb-6">

          <h4 className="text-lg text-[#00026E] font-semibold">Filter by</h4>
        </div>
        <hr className="mb-5" />
        {/* Sort Listing */}


      

        <div className="mb-4">
  <h4 className="text-base text-[#00026E] font-semibold mb-2">Price Range</h4>
  
  {/* Range Input */}
  <input
    className="w-full appearance-none h-2 rounded-lg bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    type="range"
    min="1000"
    max="10000"
    step="500" /* Ensures full and half increments */
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    style={{
      WebkitAppearance: "none",
    }}
  />
  {/* Add Thumb Styling */}
  <style jsx>{`
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background-color: #1e40af; /* Blue-600 */
      cursor: pointer;
      border: 2px solid #93c5fd; /* Light Blue Border */
    }

    input[type="range"]::-moz-range-thumb {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background-color: #1e40af; /* Blue-600 */
      cursor: pointer;
      border: 2px solid #93c5fd; /* Light Blue Border */
    }
  `}</style>
  
  {/* Display Selected Price */}
  <div className="flex justify-between items-center mt-2">
    <p className="text-sm text-gray-500">Selected Price:</p>
    <span className="text-sm font-medium text-blue-600">
      {price % 1000 === 0 
        ? `${parseInt(price).toLocaleString()} BDT` 
        : `${parseInt(price).toLocaleString()} (Half) BDT`}
    </span>
  </div>
</div>

        <hr className="mb-5" />
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 text-[#00026E] ">
            <RiArrowUpDownLine className="text-gray-600 text-xl" />
            <h4 className="text-sm font-medium">Sort Listing</h4>
          </div>
          <select className="w-full border border-gray-300 rounded-md text-[#00026E] px-4 py-2 text-sm focus:ring-blue-400 focus:border-blue-400">
            <option value="1">Sort by Popularity</option>
            <option value="2">Price low to high</option>
            <option value="3">Price high to low</option>
          </select>
        </div>
        {/* Price Range */}

        <hr />

        {/* Filter by Duration */}
        <div className="mt-6 text-[#00026E]">
          <div className="flex items-center gap-2 mb-4">
            <h4 className="text-lg font-semibold"> Duration</h4>
          </div>

          {/* Duration Options */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="duration"
                value="less_than_6"
                checked={duration === "less_than_6"}
                onChange={(e) => setDuration(e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-800">Less than 6 hours</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="duration"
                value="6_to_12"
                checked={duration === "6_to_12"}
                onChange={(e) => setDuration(e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-800">6-12 hours</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="duration"
                value="12_to_24"
                checked={duration === "12_to_24"}
                onChange={(e) => setDuration(e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-800">12-24 hours</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="duration"
                value="24_plus"
                checked={duration === "24_plus"}
                onChange={(e) => setDuration(e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-800">24+ hours</span>
            </label>
          </div>
        </div>

        {/* Apply Button */}
        <button className="bg-blue-900 text-white px-4 py-2 rounded-md mt-10 text-sm">
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
