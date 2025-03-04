"use client";
import IconShow from "@/app/components/IconShow/IconShow";
import React, { useEffect, useState, useMemo } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Raleway } from "next/font/google";
import { TbWorld } from "react-icons/tb";
import { RiDiscussFill } from "react-icons/ri";
import { MdOutlineLeaderboard, MdOutlineWatchLater, MdPolicy, MdTipsAndUpdates } from "react-icons/md";
import { LuInfo } from "react-icons/lu";

const raleway = Raleway({ subsets: ["latin"] });

const staticFacilityTypes = [
  "Summary", "Leading", "Timing", "Inclusion & Exclusion",
  "Description", "Additional Information", "Travel Tips", "Policy"
];

const Accordion = ({ facilities = { facilities: [] } }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("Summary");

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
    setActiveTab("Summary");
    setActiveIndex("Summary");
  }, []);

  const toggleAccordion = (facilityType) => {
    setActiveIndex((prev) => (prev === facilityType ? null : facilityType));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setActiveIndex(tab); // Open the corresponding accordion section
  };

  return (
    <>
      {/* Sticky Tabs */}
      <div className="bg-white">
        <div className="flex gap-x-[30px] md:gap-x-[40px] font-semibold text-blue-900 dark:bg-gray-100 dark:text-gray-800">
          {["Summary", "Description"].map((tab, key) => (
            <div
              key={tab}
              onClick={() => handleTabClick(tab)}
              style={{marginLeft:"10px", marginRight:"10px"}}
              className={`bg-white flex font-bold  md:mx-0 items-center   flex-shrink-0 cursor-pointer py-2 border-b-4 ${
                activeTab === tab
                  ? "border-blue-500 bg-white text-[#00026E] md:mr-5"
                  : "border-transparent dark:border-gray-300 dark:text-gray-600 md:mr-5"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>
        <br />
        <hr />
      </div>

      {/* Accordion Container */}
      <div className={`${raleway.className} flex flex-col gap-4 mt-5 bg-white z-10`}>
        <div className="flex flex-wrap gap-4 mt-[25px]">
          {staticFacilityTypes.map((facilityType, index) => {
            const isOpen = activeIndex === facilityType;
            const facilityItems = groupedFacilities[facilityType] || [];

            return (
              <div key={index} className="w-full mt-[10px] cursor-pointer">
                {/* Accordion Header */}
                <div
                  className="cursor-pointer sticky top-[10px] p-3 rounded-md shadow-sm hover:bg-gray-300 flex items-center justify-between bg-white z-10"
                  onClick={() => toggleAccordion(facilityType)}
                >
                  <div className={`flex items-center ${isOpen ? "mt-[5px]" : "mt-0"}`}>
                    {facilityType === "Summary" ? (
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
                    ) : facilityType === "Leading" ? (
                      <MdOutlineLeaderboard style={{ color: "#2a026e" }} size={30} />
                    ) : null}
                    <span className={`${raleway.className} font-bold ml-2 text-blue-950 text-xl`}>
                      {facilityType}
                    </span>
                  </div>
                  <div>{isOpen ? <FaMinus className="text-gray-400" size={20} /> : <FaPlus className="text-gray-400" size={20} />}</div>
                </div>

                {/* Accordion Content */}
                <div
                  className={`transition-all duration-1000 ease-in-out overflow-y-auto rounded-md shadow-inner leading-loose ${
                    isOpen ? "opacity-100 p-4 block mt-[10px] max-h-[300px]" : "opacity-0 p-0 hidden max-h-0"
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
    </>
  );
};

export default Accordion;
