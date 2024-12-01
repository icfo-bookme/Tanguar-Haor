"use client"
import { RiArrowLeftDoubleLine, RiArrowUpDownLine } from "react-icons/ri";
import { FaDollarSign } from "react-icons/fa";
import { useState } from "react";

const FilterSidebar = () => {
  const [price, setPrice] = useState(1000); // Default price value

  return (
    <div className="col-span-1 xl:col-span-3">
      <div className="p-4 border rounded-lg bg-white shadow">
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

          {/* Apply Button */}
          <button className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
