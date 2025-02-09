"use client";
import IconShow from "@/app/components/IconShow/IconShow";
import React, { useEffect, useState, useMemo } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Accordion = ({ facilities = { facilities: [] }, activeTab }) => {
  const [activeIndexes, setActiveIndexes] = useState({});

  // 🟢 Memoize grouped facilities
  const groupedFacilities = useMemo(() => {
    return (facilities.facilities || []).reduce((acc, facility) => {
      if (!acc[facility.facility_type]) {
        acc[facility.facility_type] = [];
      }
      acc[facility.facility_type] = acc[facility.facility_type].concat(facility.facilities);
      return acc;
    }, {});
  }, [facilities]);

  // 🟢 Open first section by default OR override with activeTab
  useEffect(() => {
    if (Object.keys(groupedFacilities).length === 0) return;

    setActiveIndexes((prevState) => {
      const newActiveIndexes = { ...prevState };
      let defaultOpened = false;

      Object.entries(groupedFacilities).forEach(([facilityType, facilityItems]) => {
        // If activeTab matches, open this section
        const matchesActiveTab = facilityItems.some(
          (item) => item.facility_name?.toLowerCase() === activeTab?.toLowerCase()
        );

        if (matchesActiveTab) {
          newActiveIndexes[facilityType] = true;
          defaultOpened = true; // Prevent default opening another section
        }
      });

      // If no activeTab match, open the first section
      if (!defaultOpened) {
        const firstFacilityType = Object.keys(groupedFacilities)[0];
        if (firstFacilityType) {
          newActiveIndexes[firstFacilityType] = true;
        }
      }

      return newActiveIndexes;
    });
  }, [activeTab, groupedFacilities]);

  // 🟢 Toggle function
  const toggleAccordion = (facilityType) => {
    setActiveIndexes((prevState) => ({
      ...prevState,
      [facilityType]: !prevState[facilityType],
    }));
  };

  return (
    <div className={`${inter.className} flex flex-col gap-4 mt-5`}>
      <div className="flex flex-wrap gap-4">
        {Object.entries(groupedFacilities).map(([facilityType, facilityItems], index) => {
          const isOpen = activeIndexes[facilityType] || false;
          const firstIcon = facilityItems[0]?.icon || null;

          return (
            <div key={index} className="w-full">
              <div
                className="cursor-pointer p-3 rounded-md shadow-sm hover:bg-gray-300 flex items-center justify-between"
                onClick={() => toggleAccordion(facilityType)}
              >
                <div className="flex items-center">
                  {firstIcon && <IconShow iconName={firstIcon} className="text-blue-800" size={30} />}
                  <span className="font-semibold ml-2 text-blue-950 text-xl">{facilityType}</span>
                </div>

                <div>
                  {isOpen ? <FaMinus className="text-gray-400" size={20} /> : <FaPlus className="text-gray-400" size={20} />}
                </div>
              </div>

              <div className={`p-4 rounded-md shadow-inner leading-loose ${isOpen ? "block" : "hidden"}`}>
                {facilityItems.map((item, itemIndex) => (
                  <div key={itemIndex} className="text-blue-900 text-sm mb-2">
                    <h1 className="font-bold mb-1">{item.facility_name}</h1>
                    <div dangerouslySetInnerHTML={{ __html: item.value }} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;
