"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import { IoLocation } from "react-icons/io5";

export default function PropertyPage() {
    const params = useParams();
    const { id } = params;

    const [propertyImages, setPropertyImages] = useState([]);
    const [propertyDetails, setPropertyDetails] = useState(null);
    const [propertyFacilities, setPropertyFacilities] = useState([]); // Facility data
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        const fetchPropertyImages = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/propertyImages/${id}`, {
                    next: { revalidate: 10 },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await res.json();

                if (!data || data.length === 0) {
                    return notFound();
                }

                setPropertyImages(data);
            } catch (error) {
                console.error('Error fetching property images:', error);
                return notFound();
            }
        };

        const fetchPropertyDetails = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/propertySummary/${id}`);

                if (!res.ok) {
                    throw new Error('Failed to fetch property details');
                }

                const data = await res.json();

                if (!data || data.length === 0) {
                    return notFound();
                }

                setPropertyDetails(data[0]);
            } catch (error) {
                console.error('Error fetching property details:', error);
                return notFound();
            }
        };

        const fetchPropertyFacilities = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/propertyfacilities/${id}`);

                if (!res.ok) {
                    throw new Error('Failed to fetch property facilities');
                }

                const data = await res.json();

                if (!data || data.length === 0) {
                    return notFound();
                }

                setPropertyFacilities(data); // Set the entire facilities array here
            } catch (error) {
                console.error('Error fetching property facilities:', error);
            }
        };

        fetchPropertyImages();
        fetchPropertyDetails();
        fetchPropertyFacilities(); // Fetch property facilities

    }, [id]);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % propertyImages.length);
    };

    const prevImage = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + propertyImages.length) % propertyImages.length
        );
    };

    const goToImage = (index) => {
        setCurrentIndex(index);
    };

    const toggleAccordion = (facilityIndex, itemIndex) => {
        const currentIndex = `${facilityIndex}-${itemIndex}`;
        setActiveIndex(activeIndex === currentIndex ? null : currentIndex);
    };

    if (!propertyDetails || propertyImages.length === 0) return <div>Loading...</div>;

    return (
        <div>
            <div className="grid grid-cols-3 gap-8">
                <div className="flex col-span-2">
                    <div className="flex-1 relative">
                        <button
                            onClick={prevImage}
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-2xl bg-gray-800 bg-opacity-50 rounded-full p-2"
                        >
                            &lt;
                        </button>

                        <div className="relative w-full h-96">
                            <Image
                                src={`http://127.0.0.1:8000/storage/${propertyImages[currentIndex].path}`}
                                alt={`Property Image ${currentIndex + 1}`}
                                fill
                                className="object-cover rounded shadow"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>

                        <button
                            onClick={nextImage}
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-2xl bg-gray-800 bg-opacity-50 rounded-full p-2"
                        >
                            &gt;
                        </button>
                    </div>

                    <div className="flex flex-col justify-center ml-4">
                        {propertyImages.map((image, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer mb-2 p-1 border-2 ${currentIndex === index ? 'border-blue-500' : 'border-gray-300'}`}
                                onClick={() => goToImage(index)}
                            >
                                <Image
                                    src={`http://127.0.0.1:8000/storage/${image.path}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    width={80}
                                    height={80}
                                    className="object-cover rounded"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-1 pl-4">
                    <h2 className="text-xl text-blue-700 font-semibold">{propertyDetails.property_name}</h2>

                    <p className="flex pb-3 items-center">
                        <strong><IoLocation /></strong> {propertyDetails.address}
                    </p>

                    <Image
                        src="/map.png"
                        alt="map"
                        width={400}
                        height={200}
                        className="rounded-lg"
                    />

                    {propertyDetails.property_summaries && (
                        <div className="flex flex-col gap-3 mt-3">
                            <div className="flex">
                                {propertyDetails.property_summaries.slice(0, 1).map((summary) => (
                                    <div key={summary.id} className="flex items-center text-blue-700">
                                        <Image
                                            src={`http://127.0.0.1:8000/storage/${summary.image}`}
                                            alt={summary.value}
                                            width={20}
                                            height={20}
                                            className="rounded-lg"
                                        />
                                        <span className="ml-2 text-gray-900">{summary.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center gap-4">
                                <div className="flex gap-4">
                                    {propertyDetails.property_summaries.slice(1, 3).map((summary) => (
                                        <div key={summary.id} className="flex pb-5 items-center">
                                            <Image
                                                src={`http://127.0.0.1:8000/storage/${summary.image}`}
                                                alt={summary.value}
                                                width={20}
                                                height={20}
                                                className="rounded-lg"
                                            />
                                            <span className="ml-2 text-gray-900">{summary.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>


     
          
<div className='grid grid-cols-3'>
            {/* Property Facilities (Full Width Section) */}
            
            <div className="w-full pl-4 mt-5 col-span-2">
            <div className="flex -mx-4 space-x-2 overflow-x-auto overflow-y-hidden ml-2 flex-nowrap dark:bg-gray-100 dark:text-gray-800">
	<a rel="noopener noreferrer" href="#" className="flex items-center flex-shrink-0 px-5 py-2 border-b-4 dark:border-gray-300 dark:text-gray-600">Details</a>
	<a rel="noopener noreferrer" href="#" className="flex items-center flex-shrink-0 px-5 py-2 border-b-4 dark:border-gray-300 dark:text-gray-600">Option</a>
	<a rel="noopener noreferrer" href="#" className="flex items-center flex-shrink-0 px-5 py-2 border-b-4 dark:border-violet-600 dark:text-gray-900">Policy</a>
	{/* <a rel="noopener noreferrer" href="#" className="flex items-center flex-shrink-0 px-5 py-2 border-b-4 dark:border-gray-300 dark:text-gray-600">Consectetur</a> */}
</div>
                {propertyFacilities.length > 0 && (
                    <div className="flex flex-col gap-4 mt-5">
           
                        <div className="flex flex-wrap gap-4">
                            {propertyFacilities.map((facility, index) => (
                                <div key={index} className="w-full">
                                    {facility.facilities && facility.facilities.map((item, itemIndex) => (
                                        <div key={itemIndex} className="w-full mb-3">
                                            {/* Accordion Question (Facility Name) */}
                                            <div 
                                                className="cursor-pointer p-3 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300"
                                                onClick={() => toggleAccordion(index, itemIndex)}
                                            >
                                                <span className="font-semibold text-gray-800">{item.facilty_name}</span>
                                            </div>

                                            {/* Accordion Answer */}
                                            {activeIndex === `${index}-${itemIndex}` && (
                                                <div className="p-4 bg-gray-50 rounded-md mt-2 shadow-inner">
                                                    <div className="text-gray-900 text-base leading-relaxed">
                                                        {/* Render the item value as HTML */}
                                                        <div 
                                                            dangerouslySetInnerHTML={{ __html: item.value }} 
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className='flex items-center justify-center'>
                This is contract form
            </div>
            </div>
        </div>
    );
}
