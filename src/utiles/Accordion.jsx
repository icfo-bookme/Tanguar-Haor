"use client";
import IconShow from "@/app/components/IconShow/IconShow";
import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";


const Accordion = ({ facilities }) => {
  const [activeIndexes, setActiveIndexes] = useState({});
  const [defaultOpen, setDefaultOpen] = useState(null);

  const groupedFacilities = facilities.facilities.reduce((acc, facility) => {
    if (!acc[facility.facility_type]) {
      acc[facility.facility_type] = [];
    }
    acc[facility.facility_type] = acc[facility.facility_type].concat(
      facility.facilities
    );
    return acc;
  }, {});

  useEffect(() => {
    const firstFacilityType = Object.keys(groupedFacilities)[0];
    if (firstFacilityType) {
      setActiveIndexes((prev) => ({
        ...prev,
        [firstFacilityType]: true,
      }));
      setDefaultOpen(firstFacilityType);
    }
  }, []);

  const toggleAccordion = (facilityType) => {
    setActiveIndexes((prevState) => ({
      ...prevState,
      [facilityType]: !prevState[facilityType],
    }));
  };

  return (
    <div className="flex flex-col gap-4 mt-5">
      <div className="flex flex-wrap gap-4">
        {Object.entries(groupedFacilities).map(
          ([facilityType, facilityItems], index) => {
            const isOpen =
              activeIndexes[facilityType] || defaultOpen === facilityType;
            const firstIcon = facilityItems[0]?.icon || null;

            return (
              <div key={index} className="w-full">
                <div
                  className="cursor-pointer p-3 rounded-md shadow-sm hover:bg-gray-300 flex items-center justify-between"
                  onClick={() => toggleAccordion(facilityType)}
                >
                  <div className="flex items-center">
                    {/* Dynamically Render Icon */}
                    {firstIcon && (
                      <IconShow
                        iconName={firstIcon}
                        className="text-blue-800"
                        size={30}
                      />
                    )}
                    <span className="font-semibold ml-2 cursor-pointer !text-blue-800 text-xl">
                      {facilityType}
                    </span>
                  </div>
                  <div>
                    {isOpen ? (
                      <FaMinus className="text-gray-400 cursor-pointer" size={20} />
                    ) : (
                      <FaPlus className="text-gray-400 cursor-pointer" size={20} />
                    )}
                  </div>
                </div>

                <div
                  className={`p-4 bg-gray-50 rounded-md shadow-inner ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  {facilityItems.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="custom-content text-blue-900 text-sm leading-relaxed mb-2"
                    >
                      <h1 className="font-bold">{item.facility_name}</h1>
                      <div dangerouslySetInnerHTML={{ __html: item.value }} />
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Accordion;
