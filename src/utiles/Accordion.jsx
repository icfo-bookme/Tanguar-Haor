"use client";
import IconShow from "@/app/components/IconShow/IconShow";
import React, { useEffect, useState, useMemo } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const Accordion = ({ facilities = { facilities: [] }, activeTab, href }) => {
  const [activeIndexes, setActiveIndexes] = useState({});

  // 🟢 Memoize grouped facilities
  const groupedFacilities = useMemo(() => {
    const grouped = (facilities.facilities || []).reduce((acc, facility) => {
      if (!acc[facility.facility_type]) {
        acc[facility.facility_type] = [];
      }
      acc[facility.facility_type] = acc[facility.facility_type].concat(
        facility.facilities
      );
      return acc;
    }, {});
    return grouped;
  }, [facilities]);

  // 🟢 Open section according to href or activeTab
  useEffect(() => {
    if (Object.keys(groupedFacilities).length === 0) return;

    setActiveIndexes((prevState) => {
      const newActiveIndexes = {};

      Object.entries(groupedFacilities).forEach(
        ([facilityType, facilityItems]) => {
          // If href matches facilityType, open this section
          const matchesHref =
            `#${facilityType.toLowerCase().replace(/\s+/g, "-")}` ===
            href?.toLowerCase();

          newActiveIndexes[facilityType] = matchesHref;
        }
      );

      console.log(newActiveIndexes); // Log newActiveIndexes

      return newActiveIndexes;
    });
  }, [href, groupedFacilities, activeTab]);

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
        {Object.entries(groupedFacilities).map(
          ([facilityType, facilityItems], index) => {
            const isOpen = activeIndexes[facilityType] === true;
            console.log(activeIndexes[facilityType]);
            const firstIcon = facilityItems[0]?.icon || null;

            return (
              <div
                key={index}
                className="w-full"
                id={facilityType.toLowerCase().replace(/\s+/g, "-")}
              >
                <div
                  className="cursor-pointer p-3 rounded-md shadow-sm hover:bg-gray-300 flex items-center justify-between"
                  onClick={() => toggleAccordion(facilityType)}
                >
                  <div className="flex items-center">
                    {firstIcon && (
                      <IconShow
                        iconName={firstIcon}
                        className="text-blue-800"
                        size={30}
                      />
                    )}
                    <span className="font-semibold ml-2 text-blue-950 text-xl">
                      {facilityType}
                    </span>
                  </div>

                  <div>
                    {isOpen ? (
                      <FaMinus className="text-gray-400" size={20} />
                    ) : (
                      <FaPlus className="text-gray-400" size={20} />
                    )}
                  </div>
                </div>

                <div
                  className={`p-4 rounded-md shadow-inner leading-loose ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  {facilityItems.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="text-blue-900 text-sm mb-2"
                      id={item.facility_name
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")}
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
