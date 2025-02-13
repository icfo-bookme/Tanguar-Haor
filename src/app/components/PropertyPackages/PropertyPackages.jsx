import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export const PropertyPackages = ({ packages }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="font-semibold text-2xl text-blue-950 text-center mb-5">Additional Packages</h1>
      {packages.map((pkg) => (
        <div
          key={pkg.unit_id}
          className="flex relative max-w-5xl mb-12 bg-white shadow-lg rounded-lg overflow-hidden p-4"
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${pkg.mainimg}`}
            alt={`Package Image - ${pkg.unit_name}`}
            className="w-48 h-48 object-cover rounded-md"
          />

          <div className="p-4 flex flex-col ">
            <h2 className="text-2xl font-semibold text-blue-900 pb-2">{pkg.unit_name}</h2>
            <p className="text-gray-600">
              {pkg.unit_type} | Person Allowed: {pkg.person_allowed} | Additional Bed: {pkg.additionalbed}
            </p>
            <div className="flex gap-2 mt-2 mb-5">
              <div className="px-2 border border-blue-950 rounded-full w-[90px]">
                Call Now
              </div>
              <div className="px-2 border border-blue-950 rounded-full w-[130px] flex items-center justify-center gap-2">
                <FaWhatsapp className="text-green-500 text-xl" />
                Book Now
              </div>
            </div>
            <div className="flex justify-between">
              
              {pkg.price?.length > 0 ? (
                <p className="text-blue-950 text-xl font-semibold">Price: {pkg.price[0].price} BDT</p>
              ) : (
                <p className="text-red-500">Price: Not Available</p>
              )}
<button className="btn  px-3 py-1 rounded-full bg-blue-900 text-white">Add Cart</button>
            </div>

            {pkg.discount?.length > 0 && (
              <p className="text-white bg-red-700 p-2 rounded-full text-xs font-semibold absolute top-2 -left-0 w-14 h-14 flex flex-col items-center justify-center">
                {Math.floor(pkg.discount[0].discount_percent)}%
                <span className="text-[10px]"> OFF</span>
              </p>


            )}
          </div>
        </div>
      ))}
    </div>
  );
};
