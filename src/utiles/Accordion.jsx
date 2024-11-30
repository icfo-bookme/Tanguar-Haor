"use client";
import React, { useEffect, useState } from "react";

// Dynamically import the icon based on the icon name
const getIconComponentAsync = async (iconName) => {
  if (!iconName) return null;

  try {
    // Determine the library based on the icon prefix
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
      console.error(`Icon not found: ${iconName}`);
      return null;
    }
    return IconComponent;
  } catch (error) {
    console.error("Error dynamically loading icon:", error);
    return null;
  }
};

const Accordion = ({ facilities }) => {
  // Set initial active index to the first item
  const [activeIndex, setActiveIndex] = useState("0-0"); // Assuming the first question should be open
  const [icons, setIcons] = useState({}); // Store dynamically loaded icons

  useEffect(() => {
    let isMounted = true; // Track mount state

    const loadIcons = async () => {
      const iconMap = {};
      for (const facility of facilities) {
        for (const item of facility.facilities) {
          const iconName = item.icons.icon_name;
          const IconComponent = await getIconComponentAsync(iconName);
          if (isMounted && IconComponent) {
            iconMap[iconName] = IconComponent;
          }
        }
      }
      if (isMounted) {
        setIcons(iconMap); // Update icons only if mounted
      }
    };

    loadIcons();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [facilities]);

  const toggleAccordion = (facilityIndex, itemIndex) => {
    const newIndex = `${facilityIndex}-${itemIndex}`;
    setActiveIndex((prevIndex) => (prevIndex === newIndex ? "" : newIndex));
  };

  return (
    <div className="flex flex-col gap-4 mt-5">
      <div className="flex flex-wrap gap-4">
        {facilities.map((facility, facilityIndex) => (
          <div key={facilityIndex} className="w-full">
            {facility.facilities &&
              facility.facilities.map((item, itemIndex) => {
                const iconName = item.icons.icon_name;
                const IconComponent = icons[iconName]; // Get the loaded icon

                return (
                  <div key={itemIndex} className="w-full mb-4"> {/* Ensure spacing between questions */}
                    {/* Accordion Header */}
                    <div
                      className="cursor-pointer p-3 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 flex items-center"
                      onClick={() => toggleAccordion(facilityIndex, itemIndex)}
                    >
                      {/* Icon */}
                      {IconComponent ? (
                        <IconComponent className="text-gray-800  pr-2" size={24} />
                      ) : (
                        <span className="text-red-500">Icon not found</span>
                      )}
                      {/* Facility Name */}
                      <span className="font-semibold ml-2  text-gray-800">
                        {item.facilty_name}
                      </span>
                    </div>

                    {/* Accordion Content */}
                    <div
                      className={`p-4 bg-gray-50 rounded-md mt-2 shadow-inner ${activeIndex === `${facilityIndex}-${itemIndex}` ? 'block' : 'hidden'}`}
                    >
                      <div
                        className="custom-content text-gray-700 text-base leading-relaxed space-y-2"
                        dangerouslySetInnerHTML={{ __html: item.value }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
