import getPropertyDetails from "@/utiles/getPropertyDetails";
import { getPropertyImages } from "@/utiles/getPropertyImages";
import ImageCarousel from "@/utiles/ImageCarousel";
import Image from "next/image";
import { IoLocation } from "react-icons/io5";
import { SlLocationPin } from 'react-icons/sl';
import { FaRegUser, FaRegClock } from 'react-icons/fa';
import getFacilities from "@/utiles/getFacilities";
import Accordion from "@/utiles/Accordion";
import IconShow from "@/utiles/IconShow";

export default async function Page({ params }) {
    const { id } = await params;
    const iconMap = {
        SlLocationPin: <SlLocationPin size={25} />,
        FaRegUser: <FaRegUser size={25} />,
        FaRegClock: <FaRegClock size={25} />,
    };
    // Fetch property images using the parameter from the URL
    const propertyImages = await getPropertyImages(id);
    const propertyDetails = await getPropertyDetails(id);
    const propertyFacilities = await getFacilities(id);

    // Handle case where no images are found or data is missing
    if (!propertyImages || propertyImages.length === 0) {
        return (
            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-8">
                    {/* Fallback structure when no images are found */}
                    <div className="col-span-3 flex justify-center items-center">
                        <div className="w-full h-96 bg-gray-200 flex justify-center items-center">
                            <span className="text-gray-500">No images available</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#EBF0F4]">
            <div className="container mx-auto ">
                <div className="grid grid-cols-3 gap-8">
                    {/* Display the image carousel if images exist */}
                    <ImageCarousel propertyImages={propertyImages} />
                    <div className="col-span-1">
                        {propertyDetails?.map((property, index) => (
                            <div key={index} >
                                <h2 className="text-xl text-blue-700 font-semibold">{property.property_name}</h2>
                                <p className="flex pb-3 items-center">
                                    <strong><IoLocation /></strong> {property.address}
                                </p>
                                <Image
                                    src="/map.png"
                                    alt="map"
                                    width={400}
                                    height={200}
                                    className="rounded-lg"
                                />
                                {property?.property_summaries && property.property_summaries.length > 0 && (
                                    <div className="flex flex-col gap-3 mt-3">
                                        <div className="flex">

                                            {/* Render Property Summaries */}
                                            {property.property_summaries && (
                                                <div className="flex flex-col gap-3 mt-3">
                                                    {/* First row: Show 1 summary */}
                                                    <div className="flex flex-wrap gap-4">
                                                        {property.property_summaries.slice(0, 1).map((summary) => (
                                                            <div key={summary.id} className="flex items-center text-blue-700">
                                                             <IconShow iconName={summary.icons.icon_name} />
                                                                <span className="ml-2 text-blue-900">{summary.value}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Second row: 2 summaries side by side and button on the right */}
                                                    <div className="flex flex-wrap justify-between items-center gap-4">
                                                        {/* Summaries */}
                                                        <div className="flex gap-4 w-full md:w-auto">
                                                            {property.property_summaries.slice(1, 3).map((summary) => (
                                                                <div key={summary.id} className="flex items-center text-gray-700">
                                                                 
                                                                   <IconShow iconName={summary?.icons?.icon_name} />
                                                                    <span className="ml-2 text-gray-900">{summary.value}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Property Facilities (Full Width Section) */}
                <div className="bg-white">
                    <div className="w-full pl-4 mt-5">
                        <div className="flex -mx-4 space-x-2 overflow-x-auto flex-nowrap dark:bg-gray-100 dark:text-gray-800">
                            <a href="#" className="flex items-center flex-shrink-0 px-5 py-2 border-b-4 dark:border-gray-300 dark:text-gray-600">Details</a>
                            <a href="#" className="flex items-center flex-shrink-0 px-5 py-2 border-b-4 dark:border-gray-300 dark:text-gray-600">Option</a>
                            <a href="#" className="flex items-center flex-shrink-0 px-5 py-2 border-b-4 dark:border-violet-600 dark:text-gray-900">Policy</a>
                        </div>
                        <div className="grid grid-cols-3 gap-10">
                            <div className="col-span-2"> 
                            <Accordion facilities={propertyFacilities} />
                            </div>
                            
                            <div className="col-span-1">
                                this is contract form
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
