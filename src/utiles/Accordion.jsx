"use client";
import React, { useState, useMemo } from "react";
import { Accordion } from "flowbite-react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Raleway } from "next/font/google";
import { TbWorld } from "react-icons/tb";
import { RiDiscussFill } from "react-icons/ri";
import { MdOutlineWatchLater, MdPolicy, MdTipsAndUpdates } from "react-icons/md";
import { LuInfo } from "react-icons/lu";
import { IoLocationSharp } from "react-icons/io5";

const raleway = Raleway({ subsets: ["latin"] });

const staticFacilityTypes = [
  "Summary", "Location", "Timing", "Inclusion & Exclusion",
  "Description", "Additional Information", "Travel Tips", "Policy"
];

const AccordionBookMe = ({ facilities = { facilities: [] } }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

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

  const toggleAccordion = (facilityType) => {
    setActiveIndex((prev) => (prev === facilityType ? null : facilityType));
    setActiveTab(facilityType); // Syncing tab with accordion
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setActiveIndex(tab); // Open the corresponding accordion
  };

  return (
    <div className={`${raleway.className} flex flex-col gap-4 mt-5 bg-white z-10`}>
      {/* Sticky Tabs */}
      <div className="bg-white">
        <div className="flex gap-x-[30px] md:gap-x-[40px] font-semibold text-blue-900 dark:bg-gray-100 dark:text-gray-800">
          {["Summary", "Description"].map((tab) => (
            <div
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`bg-white flex font-bold mx-[10px] items-center flex-shrink-0 cursor-pointer py-2${
                activeTab === tab
                  ? " bg-white text-[#00026E] md:mr-5"
                  : " dark:border-gray-300 dark:text-gray-600 md:mr-5"
              }`}
              style={{
                borderBottom: activeTab === tab ? "2px solid blue" : "none",
              }}
            >
              {tab}
            </div>
          ))}
        </div>
        <br />
        <hr />
      </div>

      {/* Accordion Container */}
      <div className="flex flex-wrap gap-4 mt-[25px]">
        {staticFacilityTypes.map((facilityType, index) => {
          const isOpen = activeIndex === facilityType;
          const facilityItems = groupedFacilities[facilityType] || [];

          return (
            <div key={index} className="w-full mt-[10px] cursor-pointer">
              <Accordion alwaysOpen={false} className="border-0">
                <Accordion.Panel className="border-0">
                  {/* Custom Accordion Title (No Default Arrow) */}
                  <div
                    className="flex justify-between items-center w-full cursor-pointer px-4 py-3 bg-white border-b"
                    onClick={() => toggleAccordion(facilityType)}
                  >
                    <div className="flex items-center">
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
                      ) : facilityType === "Location" ? (
                        <IoLocationSharp style={{ color: "#2a026e" }} size={30} />
                      ) : null}

                      <span className="font-bold ml-2 text-blue-950 text-xl">
                        {facilityType}
                      </span>
                    </div>
                    <div>
                      {isOpen ? <FaMinus className="text-black" size={20} /> : <FaPlus className="text-black" size={20} />}
                    </div>
                  </div>

                  {isOpen && (
                    <Accordion.Content>
                      {facilityItems.map((item, itemIndex) => (
                        <div key={itemIndex} className="text-sm text-[#00026E] mb-2">
                          <h1 className="font-bold mb-1">{item.facility_name}</h1>
                          <div dangerouslySetInnerHTML={{ __html: item.value }} />
                        </div>
                      ))}
                    </Accordion.Content>
                  )}
                </Accordion.Panel>
              </Accordion>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccordionBookMe;
