"use client";
import React, { useState } from "react";
import * as FaIcons from "react-icons/fa"; // Import all FontAwesome icons
import * as TbIcons from "react-icons/tb"; // Import all Tabler icons

const Accordion = ({ facilities }) => {
    const [activeIndex, setActiveIndex] = useState("0-0");

    const toggleAccordion = (facilityIndex, itemIndex) => {
        const newIndex = `${facilityIndex}-${itemIndex}`;
        setActiveIndex((prevIndex) => (prevIndex === newIndex ? null : newIndex));
    };

    // Function to dynamically get the icon component
    const getIconComponent = (iconName) => {
        if (iconName) {
            // Dynamically resolve the icon based on the prefix (e.g., Fa, Tb)
            if (iconName.startsWith("Fa")) {
                // Return icon from FontAwesome (fa)
                const icon = FaIcons[iconName];
                return icon || null;
            } else if (iconName.startsWith("Tb")) {
                // Return icon from Tabler (tb)
                const icon = TbIcons[iconName];
                return icon || null;
            }
        }
        return null;
    };

    return (
        <div className="flex flex-col gap-4 mt-5">
            <div className="flex flex-wrap gap-4">
                {facilities.map((facility, facilityIndex) => (
                    <div key={facilityIndex} className="w-full">
                        {facility.facilities &&
                            facility.facilities.map((item, itemIndex) => {
                                // Dynamically resolve the icon component using the getIconComponent function
                                const IconComponent = getIconComponent(item.icons.icon_name);

                                return (
                                    <div key={itemIndex} className="w-full mb-3">
                                        {/* Accordion Question with Icon */}
                                        <div
                                            className="cursor-pointer p-3 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 flex items-center"
                                            onClick={() =>
                                                toggleAccordion(facilityIndex, itemIndex)
                                            }
                                        >
                                            {/* Render the dynamic icon */}
                                            {IconComponent && (
                                                <IconComponent
                                                    className="text-gray-800 pr-2"
                                                    size={24}
                                                />
                                            )}
                                            <span className="font-semibold ml-2 text-gray-800">
                                                {item.facilty_name}
                                            </span>
                                        </div>

                                        {/* Accordion Answer */}
                                        {activeIndex === `${facilityIndex}-${itemIndex}` && (
                                            <div className="p-4 bg-gray-50 rounded-md mt-2 shadow-inner mb-10">
                                                <div
                                                    className="custom-content text-gray-700 text-base leading-relaxed space-y-2"
                                                    dangerouslySetInnerHTML={{ __html: item.value }}
                                                />
                                            </div>
                                        )}
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
