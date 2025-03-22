"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { Accordion } from "flowbite-react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Raleway } from "next/font/google";
import { TbWorld } from "react-icons/tb";
import { RiDiscussFill } from "react-icons/ri";
import { MdOutlineWatchLater, MdPolicy, MdTipsAndUpdates } from "react-icons/md";
import { LuInfo } from "react-icons/lu";
import { IoLocationSharp } from "react-icons/io5";

// Import the Google font
const raleway = Raleway({ subsets: ["latin"] });

const staticFacilityTypes = [
  "Summary", "Location", "Timing", "Inclusion & Exclusion",
  "Description", "Additional Information", "Travel Tips", "Policy"
];

const AccordionBookMe = ({ facilities = { facilities: [] } }) => {
  const [activeIndexes, setActiveIndexes] = useState(["Summary"]); // Initially open "Summary"
  const [activeTab, setActiveTab] = useState("Summary");
  const titleRefs = useRef({});
  const accordionRefs = useRef({});
  const tabsRef = useRef(null);

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

  // Toggle function for opening/closing individual accordion panels
  const toggleAccordion = (facilityType) => {
    setActiveIndexes((prev) => {
      if (facilityType === "Summary") {
        // Close the "Summary" if it's currently open
        if (prev.includes("Summary")) {
          return prev.filter((item) => item !== "Summary");
        } else {
          return ["Summary"]; // Open the "Summary" if it's closed
        }
      }

      // For other facility types, toggle as usual
      if (prev.includes(facilityType)) {
        return prev.filter((item) => item !== facilityType);
      } else {
        return [...prev, facilityType];
      }
    });

    // Set the active tab to "Summary" if it is closed, otherwise set to the clicked facilityType
    if (facilityType === "Summary" && activeIndexes.includes("Summary")) {
      setActiveTab("Summary");
    } else {
      setActiveTab(facilityType);
    }
  };

  // Handle Sticky Scroll Behavior for Accordion Titles
  useEffect(() => {
    let requestId;

    const handleScroll = () => {
      cancelAnimationFrame(requestId); // Cancel previous frame

      requestId = requestAnimationFrame(() => {
        Object.keys(accordionRefs.current).forEach((facilityType) => {
          const panel = accordionRefs.current[facilityType];
          const stickyTitle = titleRefs.current[facilityType];

          // Only make sticky if Accordion Content is open
          const isOpen = activeIndexes.includes(facilityType);

          if (panel && stickyTitle && isOpen) {
            const rect = panel.getBoundingClientRect();
            // Ensure it becomes sticky only when the content is in view
            if (rect.top <= 124 && rect.bottom > 124) {
              stickyTitle.style.position = "fixed";
              stickyTitle.style.top = "124px";
              stickyTitle.style.width = "56%"; // Adjust to your requirement
              stickyTitle.style.backgroundColor = "white";
              stickyTitle.style.zIndex = "50";
              stickyTitle.style.transition = "top 0.3s ease, box-shadow 0.3s ease";
              stickyTitle.dataset.sticky = "true";
            } else {
              stickyTitle.style.position = "";
              stickyTitle.style.top = "";
              stickyTitle.style.width = "";
              stickyTitle.style.backgroundColor = "";
              stickyTitle.style.zIndex = "";
              stickyTitle.style.boxShadow = "";
              stickyTitle.style.transition = "top 0.3s ease, box-shadow 0.3s ease";
              stickyTitle.dataset.sticky = "false";
            }
          } else {
            // Reset sticky title if it's not open
            if (stickyTitle) {
              stickyTitle.style.position = "";
              stickyTitle.style.top = "";
              stickyTitle.style.width = "";
              stickyTitle.style.backgroundColor = "";
              stickyTitle.style.zIndex = "";
              stickyTitle.style.boxShadow = "";
              stickyTitle.style.transition = "top 0.3s ease, box-shadow 0.3s ease";
              stickyTitle.dataset.sticky = "false";
            }
          }
        });
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      cancelAnimationFrame(requestId); // Cleanup the animation frame
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeIndexes]);

  // Handle Tab Scroll Behavior
  useEffect(() => {
    const handleTabScroll = () => {
      if (tabsRef.current) {
        const firstAccordion = accordionRefs.current[staticFacilityTypes[0]];
        const lastAccordion = accordionRefs.current[staticFacilityTypes[staticFacilityTypes.length - 1]];

        if (firstAccordion && lastAccordion) {
          const firstAccordionTop = firstAccordion.getBoundingClientRect().top;
          const lastAccordionBottom = lastAccordion.getBoundingClientRect().bottom;

          // Make the tab sticky when the first accordion reaches 124px
          if (firstAccordionTop <= 124 && lastAccordionBottom > 124) {
            tabsRef.current.classList.add("sticky1");
          } else {
            tabsRef.current.classList.remove("sticky1");
          }
        }
      }
    };

    window.addEventListener("scroll", handleTabScroll);
    return () => window.removeEventListener("scroll", handleTabScroll);
  }, []);

  return (
    <div className={`${raleway.className} flex flex-col gap-4 mt-5 bg-white z-10`}>
      <div ref={tabsRef} className="bg-white sticky top-0 z-50">
        <div className="flex text-blue-900 dark:bg-gray-100 dark:text-gray-800 font-semibold gap-x-[30px] md:gap-x-[40px]">
          {["Summary", "Description"].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`bg-white flex font-bold mx-[10px] items-center flex-shrink-0 cursor-pointer py-2${
                activeTab === tab ? " bg-white text-[#00026E] md:mr-5" : " dark:border-gray-300 dark:text-gray-600 md:mr-5"
              }`}
              style={{ borderBottom: activeTab === tab ? "2px solid blue" : "none" }}
            >
              {tab}
            </div>
          ))}
        </div>
        <hr />
      </div>

      <div className="flex flex-wrap gap-4 mt-[5px]">
        {staticFacilityTypes.map((facilityType, index) => {
          const isOpen = activeIndexes.includes(facilityType); // Check if the panel is open
          const facilityItems = groupedFacilities[facilityType] || [];

          return (
            <div
              key={index}
              className={`w-full cursor-pointer mt-[10px]`}
              ref={(el) => (accordionRefs.current[facilityType] = el)}
              data-facility-type={facilityType}
            >
              <Accordion alwaysOpen={false} className="border-0">
                <Accordion.Panel className="border-0">
                  <div
                    className="flex border-b justify-between w-full cursor-pointer items-center px-4 py-3"
                    onClick={() => toggleAccordion(facilityType)}  // Toggle the facilityType
                    ref={(el) => (titleRefs.current[facilityType] = el)}
                  >
                    <div className="flex items-center">
                      {facilityType === "Summary" ? <TbWorld size={30} style={{ color: "#2a026e" }} /> :
                        facilityType === "Description" ? <RiDiscussFill size={30} style={{ color: "#2a026e" }} /> :
                        facilityType === "Travel Tips" ? <MdTipsAndUpdates size={30} style={{ color: "#2a026e" }} /> :
                        facilityType === "Policy" ? <MdPolicy size={30} style={{ color: "#2a026e" }} /> :
                        facilityType === "Timing" ? <MdOutlineWatchLater size={30} style={{ color: "#2a026e" }} /> :
                        facilityType === "Additional Information" ? <LuInfo size={30} style={{ color: "#2a026e" }} /> :
                        facilityType === "Inclusion & Exclusion" ? <LuInfo size={30} style={{ color: "#2a026e" }} /> :
                        facilityType === "Location" ? <IoLocationSharp size={30} style={{ color: "#2a026e" }} /> : null}
                      <span className="text-blue-950 text-xl font-bold ml-2">{facilityType}</span>
                    </div>
                    {isOpen ? <FaMinus className="text-black" size={20} /> : <FaPlus className="text-black" size={20} />}
                  </div>
                  {isOpen && (
                    <Accordion.Content>
                      {facilityItems.map((item, itemIndex) => (
                        <div key={itemIndex} className="text-[#00026E] text-sm mb-2">
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