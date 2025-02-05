"use client";
import IconShow from "@/app/components/IconShow/IconShow";
import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
    <div className={`${inter.className} flex flex-col gap-4 mt-5`}>
      <div className="flex flex-wrap gap-4">
        {Object.entries(groupedFacilities).map(
          ([facilityType, facilityItems], index) => {
            const isOpen =
              activeIndexes[facilityType] || defaultOpen === facilityType;
            const firstIcon = facilityItems[0]?.icon || null;

            return (
              <div key={index} className="w-full">
                <div  id="detail"
                  className="cursor-pointer p-3 rounded-md shadow-sm hover:bg-gray-300 flex items-center justify-between"
                  onClick={() => toggleAccordion(facilityType)}
                >
                 
                    {/* Dynamically Render Icon */}

                    {facilityType !== "Options" && (
                      <div className="flex items-center">
                        {firstIcon && (
                          <IconShow
                            iconName={firstIcon}
                            className="text-blue-800"
                            size={30}
                          />
                        )}
                        <span className="font-semibold ml-2 cursor-pointer text-blue-950 text-xl">
                          {facilityType}
                        </span>
                      </div>
                    )}
                 
                  <div>
                  {facilityType == "Options" && (
                      <div className="flex items-center" id="option">
                        {firstIcon && (
                          <IconShow
                            iconName={firstIcon}
                            className="text-blue-800"
                            size={30}
                          />
                        )}
                        <span className="font-semibold ml-2 cursor-pointer text-blue-950 text-xl">
                          {facilityType}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    {isOpen ? (
                      <FaMinus
                        className="text-gray-400 cursor-pointer"
                        size={20}
                      />
                    ) : (
                      <FaPlus
                        className="text-gray-400 cursor-pointer"
                        size={20}
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`p-4 bg-gray-50 rounded-md shadow-inner leading-loose ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  {facilityItems.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="custom-content text-blue-900 text-sm leading-relaxed mb-2"
                    >
                      <h1 className="font-bold mb-1">{item.facility_name}</h1>
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
