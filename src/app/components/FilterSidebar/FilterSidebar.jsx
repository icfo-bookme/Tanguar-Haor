"use client";
import { RiArrowLeftDoubleLine, RiArrowUpDownLine } from "react-icons/ri";
import { FaDollarSign } from "react-icons/fa";
import { useState } from "react";

const FilterSidebar = () => {
  const [price, setPrice] = useState(1000); // Default price value
  const [duration, setDuration] = useState(""); // Selected duration

  return (
    <div className="col-span-1 xl:col-span-3 bg-white">
      <div className="p-4 border rounded-lg shadow bg-white">
        {/* Close Button */}
        <div className="block xl:hidden flex justify-end mb-4">
          <button className="text-gray-600 hover:text-gray-900">
            <RiArrowLeftDoubleLine className="text-xl" />
          </button>
        </div>

        {/* Heading */}
        <div className="flex items-center gap-2 mb-6">
          <FaDollarSign className="text-gray-600 text-xl" />
          <h4 className="text-lg font-semibold">Filter by</h4>
        </div>

        {/* Sort Listing */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <RiArrowUpDownLine className="text-gray-600 text-xl" />
            <h4 className="text-sm font-medium">Sort Listing</h4>
          </div>
          <select className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-blue-400 focus:border-blue-400">
            <option value="1">Sort by Popularity</option>
            <option value="2">Price low to high</option>
            <option value="3">Price high to low</option>
          </select>
        </div>

        {/* Filter By Price */}
        <div className="flex items-center gap-2 mb-6">
          <FaDollarSign className="text-gray-600 text-xl" />
          <h4 className="text-lg font-semibold">Filter by Price</h4>
        </div>

        {/* Price Range */}
        <div>
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Price Range</h4>
            <input
              className="w-full"
              type="range"
              min="1000"
              max="10000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Display Selected Price */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">Selected Price: </p>
            <span className="text-sm font-medium text-gray-800">{price} BDT</span>
          </div>
        </div>
        <hr />

        {/* Filter by Duration */}
        <div className="mt-6">
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
