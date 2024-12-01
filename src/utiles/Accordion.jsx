"use client";
import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

// Dynamically import the icon based on the icon name
const getIconComponentAsync = async (iconName) => {
  if (!iconName) return null;

  try {
    let IconComponent = null;
    if (iconName.startsWith("Tb")) {
      const { [iconName]: LoadedIcon } = await import("react-icons/tb");
      IconComponent = LoadedIcon;
    } else if (iconName.startsWith("Io")) {
      const { [iconName]: LoadedIcon } = await import("react-icons/io5");
      IconComponent = LoadedIcon;
    } else if (iconName.startsWith("Fa")) {
      const { [iconName]: LoadedIcon } = await import("react-icons/fa");
      IconComponent = LoadedIcon;
    } else {
      console.error(`...: ${iconName}`);
      return null;
    }
    return IconComponent;
  } catch (error) {
    console.error("Error dynamically loading icon:", error);
    return null;
  }
};

const Accordion = ({ facilities }) => {
  const [activeIndexes, setActiveIndexes] = useState({});
  const [icons, setIcons] = useState({});
  const [defaultOpen, setDefaultOpen] = useState(null);

  // Group facilities by `facility_type`
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
    let isMounted = true;

    const loadIcons = async () => {
      const iconMap = {};

      // Collect unique icons to load them efficiently
      const uniqueIcons = new Set(
        Object.values(groupedFacilities)
          .flat()
          .map((item) => item.icon)
      );

      // Load icons asynchronously
      const iconPromises = Array.from(uniqueIcons).map(async (iconName) => {
        const IconComponent = await getIconComponentAsync(iconName);
        if (isMounted && IconComponent) {
          iconMap[iconName] = IconComponent;
        }
      });

      await Promise.all(iconPromises);

      if (isMounted) {
        setIcons(iconMap);
      }
    };

    loadIcons();

    // Set default open item
    const firstFacilityType = Object.keys(groupedFacilities)[0];
    if (firstFacilityType) {
      setActiveIndexes((prev) => ({
        ...prev,
        [firstFacilityType]: true,
      }));
      setDefaultOpen(firstFacilityType);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleAccordion = (facilityType) => {
    setActiveIndexes((prevState) => ({
      ...prevState,
      [facilityType]: !prevState[facilityType], // Toggle open/close state for the facility type
    }));
  };

  return (
    <div className="flex flex-col gap-4 mt-5">
      <div className="flex flex-wrap gap-4">
        {Object.entries(groupedFacilities).map(
          ([facilityType, facilityItems], index) => {
            const isOpen =
              activeIndexes[facilityType] || defaultOpen === facilityType; // Default open first
            const IconComponent = facilityItems[0]?.icon
              ? icons[facilityItems[0].icon]
              : null;

            return (
              <div key={index} className="w-full">
                {/* Accordion Header */}
                <div
                  className="cursor-pointer p-3 rounded-md shadow-sm hover:bg-gray-300 flex items-center justify-between"
                  onClick={() => toggleAccordion(facilityType)}
                >
                  {/* Left: Icon and Facility Type */}
                  <div className="flex items-center">
                    {/* Icon */}
                    {IconComponent ? (
                      <IconComponent
                        className="text-blue-800 text-2xl font-bold"
                        size={30}
                      />
                    ) : (
                      <span className="text-red-500">...</span>
                    )}
                    {/* Facility Type */}
                    <span className="font-semibold ml-2 cursor-pointer text-blue-800 text-2xl">
                      {facilityType} {/* This is the question */}
                    </span>
                  </div>

                  {/* Right: + or - Icon */}
                  <div>
                    {isOpen ? (
                      <FaMinus className="text-gray-400 cursor-pointer" size={20} />
                    ) : (
                      <FaPlus className="text-gray-400 cursor-pointer" size={20} />
                    )}
                  </div>
                </div>

                {/* Accordion Content */}
                <div
                  className={`p-4 bg-gray-50 rounded-md shadow-inner ${isOpen ? "block" : "hidden"}`}
                >
                  {facilityItems.map((item, itemIndex) => (
                    <div key={itemIndex} className="custom-content text-blue-900 text-sm leading-relaxed mb-2">
                      <h1 className=" font-bold">{item.facility_name}</h1> {/* Displaying facility name */}
                      <div
                        dangerouslySetInnerHTML={{ __html: item.value }}
                      />
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
