import ContactForm from "@/app/components/ContactForm/ContactForm";
import Accordion from "@/utiles/Accordion";
import getFacilities from "@/utiles/getFacilities";
import getPropertyDetails from "@/utiles/getPropertyDetails";
import { getPropertyImages } from "@/utiles/getPropertyImages";
import IconShow from "@/utiles/IconShow";
import ImageCarousel from "@/utiles/ImageCarousel";
import Image from "next/image";
import { FaRegClock, FaRegUser } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";

export default async function Page({ params }) {
    const { id } = await params;

    const iconMap = {
        FaRegUser: <FaRegUser size={25} />,
        FaRegClock: <FaRegClock size={25} />,
    };

    // Fetch property data
    const propertyImages = await getPropertyImages(id);
    const propertyDetails = await getPropertyDetails(id);
    const propertyFacilities = await getFacilities(id);

    // Loading skeleton
    const loadingSkeleton = (
        <div className="bg-white rounded shadow-md p-4" style="">
            <div className="animate-pulse space-y-4">
                <div className="h-48 bg-gray-200 rounded-lg"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-200 -mt-4 ">
            <div className="container mx-auto w-[85%]">
                <div className="lg:grid grid-cols-3 bg-white rounded gap-8 pr-1 pt-1">
                    {/* Image Carousel or Fallback */}
                    <div className="col-span-2 ">
                        {propertyImages && propertyImages.length > 0 ? (
                            <ImageCarousel propertyImages={propertyImages} />
                        ) : (
                            <div className="w-full h-96 bg-gray-200 flex justify-center items-center">
                                <span className="text-gray-500">No images available</span>
                            </div>
                        )}
                    </div>

                    {/* Property Details */}
                    <div className="col-span-1 p-4">
                        {propertyDetails?.length === 0 ? (
                            loadingSkeleton
                        ) : (
                            propertyDetails?.map((property, index) => (
                                <div key={index}>
                                    <h2 className="text-xl text-blue-700 font-semibold">{property.property_name}</h2>
                                    <p className="flex pb-3 items-center">
                                        <strong>
                                            <IoLocation />
                                        </strong>{" "}
                                        {property.address}
                                    </p>
                                    <Image
                                        src="/map.png"
                                        alt="map"
                                        width={400}
                                        height={200}
                                        
                                        loading="lazy" 
                                        quality={75}
                                    />
                                    {property?.property_summaries && property.property_summaries.length > 0 && (
                                        <div className="flex flex-col gap-3 mt-3">
                                            <div className="flex flex-wrap gap-4">
                                                {property.property_summaries.slice(0, 1).map((summary) => (
                                                    <div key={summary.id} className="flex items-center text-blue-700">
                                                        <IconShow iconName={summary.icons.icon_name} />
                                                        <span className="ml-2 text-blue-900">{summary.value}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex flex-wrap justify-between items-center gap-4">
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
                            ))
                        )}
                    </div>
                </div>

                {/* Property Facilities */}
                <div className="bg-white">
                    <div className="w-full pl-4 mt-5 pt-5">
                        <div className="flex -mx-4 space-x-2 font-semibold text-blue-900 overflow-x-auto flex-nowrap dark:bg-gray-100 dark:text-gray-800">
                            <a
                                href="#details"
                                className="flex items-center flex-shrink-0 px-5 py-2 border-b-4 border-blue-500 text-blue-700 dark:border-gray-300 dark:text-gray-600"
                            >
                                Details
                            </a>
                            <a
                                href="#option"
                                className="flex  items-center flex-shrink-0 px-5 py-2 border-b-4 border-transparent dark:border-gray-300 dark:text-gray-600"
                            >
                                Option
                            </a>
                            <a
                                href="#policy"
                                className="flex items-center flex-shrink-0 px-5 py-2 border-b-4 border-transparent dark:border-violet-600 dark:text-gray-900"
                            >
                                Policy
                            </a>
                        </div>
                        <hr />

                        <div className="lg:grid grid-cols-3 gap-10 rounded">
                            <div className="col-span-2 pt-5">
                                <Accordion facilities={propertyFacilities} />
                            </div>

                            <div className="col-span-1">
                                <div>
                                    <h1 className="text-base shadow-2xl bg-white font-bold text-blue-900 mt-10">
                                        Get Free Tour Consultation
                                    </h1>
                                    <ContactForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
