"use client";
import IconShow from "@/app/components/IconShow/IconShow";
import React, { useEffect, useState, useMemo } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Raleway } from "next/font/google";
import { TbPackages, TbWorld } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import { RiDiscussFill } from "react-icons/ri";
import { MdOutlineLeaderboard, MdOutlineWatchLater, MdPolicy, MdTipsAndUpdates } from "react-icons/md";
import { LuInfo } from "react-icons/lu";

const raleway = Raleway({ subsets: ["latin"] });

const staticFacilityTypes = [
  "Summary", "Leading", "Timing", "Inclusion & Exclusion",
  "Description", "Additional Information", "Travel Tips", "Policy"
];

const Accordion = ({ facilities = { facilities: [] }, activeTab, href }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const groupedFacilities = useMemo(() => {
    return (facilities.facilities || []).reduce((acc, facility) => {
      if (staticFacilityTypes.includes(facility.facility_type)) {
        if (!acc[facility.facility_type]) {
          acc[facility.facility_type] = [];
        }
        acc[facility.facility_type] = acc[facility.facility_type].concat(facility.facilities);
      }
      return acc;
    }, {});
  }, [facilities]);

  useEffect(() => {
    if (Object.keys(groupedFacilities).length === 0) return;
    setActiveIndex(
      Object.keys(groupedFacilities).find((facilityType) => `#${facilityType.toLowerCase().replace(/\s+/g, "-")}` === href?.toLowerCase()) || null
    );
  }, [href, groupedFacilities, activeTab]);

  const toggleAccordion = (facilityType) => {
    setActiveIndex((prev) => (prev === facilityType ? null : facilityType));
  };

  return (
    <div className={`${raleway.className} flex flex-col gap-4 mt-5`}>
      <div className="flex flex-wrap gap-4 mt-[25px]">
        {staticFacilityTypes.map((facilityType, index) => {
          const isOpen = activeIndex === facilityType;
          const facilityItems = groupedFacilities[facilityType] || [];

          return (
            <div key={index} className="w-full mt-[10px] cursor-pointer">
              <div
                className="cursor-pointer p-3 rounded-md shadow-sm hover:bg-gray-300 flex items-center justify-between"
                onClick={() => toggleAccordion(facilityType)}
              >
                <div className="flex items-center">
                  {facilityType === "Summary" || facilityType === "Overview" ? (
                    <TbWorld style={{ color: "#2a026e" }} size={30} />
                  ) : facilityType === "Description" ? (
                    <RiDiscussFill style={{ color: "#2a026e" }} size={30} />
                  ) : facilityType === "Travel Tips" ? (
                    <MdTipsAndUpdates style={{ color: "#2a026e" }} size={30} />
                  ) : facilityType === "Policy" ? (
                    <MdPolicy style={{ color: "#2a026e" }} size={30} />
                  ) : facilityType === "Timing" ? (
                    <MdOutlineWatchLater style={{ color: "#2a026e" }} size={30} />
                  ) : facilityType === "Additional Information" ? (
                    <LuInfo style={{ color: "#2a026e" }} size={30} />
                  ) : facilityType === "Inclusion & Exclusion" ? (
                    <LuInfo style={{ color: "#2a026e" }} size={30} />
                  ) :  facilityType === "Leading" ? (
                    <MdOutlineLeaderboard  style={{ color: "#2a026e" }} size={30} />
                  ) :null
                  }

                  <span className={`${raleway.className} font-bold ml-2 text-blue-950 text-xl`}>
                    {facilityType}
                  </span>
                </div>
                <div>{isOpen ? <FaMinus className="text-gray-400" size={20} /> : <FaPlus className="text-gray-400" size={20} />}</div>
              </div>

              <div
                className={`transition-all duration-1000 ease-in-out overflow-visible rounded-md shadow-inner leading-loose ${
                  isOpen ? "opacity-100 p-4 block mt-[10px]" : "opacity-0 p-0 hidden"
                }`}
                style={{ transitionProperty: "max-height, opacity, transform", transform: isOpen ? "scaleY(1)" : "scaleY(0)" }}
              >
                {facilityItems.map((item, itemIndex) => (
                  <div key={itemIndex} className="text-sm text-[#00026E] mb-2">
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
