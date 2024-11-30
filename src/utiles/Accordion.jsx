"use client";
import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa"; // Import icons

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
  const [activeIndexes, setActiveIndexes] = useState(() => {
    const initialActiveIndexes = {};
    if (facilities?.length > 0 && facilities[0]?.facilities?.length > 0) {
      initialActiveIndexes["0-0"] = true; // Open the first question
    }
    return initialActiveIndexes;
  });

  const [icons, setIcons] = useState({});

  useEffect(() => {
    let isMounted = true;

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
        setIcons(iconMap);
      }
    };

    loadIcons();

    return () => {
      isMounted = false;
    };
  }, [facilities]);

  const toggleAccordion = (facilityIndex, itemIndex) => {
    const key = `${facilityIndex}-${itemIndex}`;
    setActiveIndexes((prevState) => ({
      ...prevState,
      [key]: !prevState[key], // Toggle open/close state for the specific question
    }));
  };

  return (
    <div className="flex flex-col gap-4 mt-5">
      <div className="flex flex-wrap gap-4">
        {facilities.map((facility, facilityIndex) => (
          <div key={facilityIndex} className="w-full">
            {facility.facilities &&
              facility.facilities.map((item, itemIndex) => {
                const iconName = item.icons.icon_name;
                const IconComponent = icons[iconName];
                const key = `${facilityIndex}-${itemIndex}`;
                const isOpen = activeIndexes[key]; // Check if the question is open

                return (
                  <div key={itemIndex} className="w-full mb-4 mouse-pointer ">
                    {/* Accordion Header */}
                    <div
                      className="cursor-pointer p-3 rounded-md shadow-sm hover:bg-gray-300 flex items-center justify-between"
                      onClick={() => toggleAccordion(facilityIndex, itemIndex)}
                    >
                      {/* Left: Icon and Facility Name */}
                      <div className="flex items-center">
                        {/* Icon */}
                        {IconComponent ? (
                          <IconComponent
                            className="text-blue-800 text-2xl font-bold"
                            size={30}
                          />
                        ) : (
                          <span className="text-red-500">Icon not found</span>
                        )}
                        {/* Facility Name */}
                        <span className="font-semibold ml-2 cursor-pointer text-blue-800 text-2xl">
                          {item.facilty_name}
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
                      className={`p-4 bg-gray-50 rounded-md shadow-inner ${
                        isOpen ? "block" : "hidden"
                      }`}
                    >
                      <div
                        className="custom-content text-blue-900 text-sm leading-relaxed"
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
