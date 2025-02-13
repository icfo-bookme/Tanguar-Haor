"use client";
import { use, useEffect, useState } from "react";
import ContactForm from "@/app/components/ContactForm/ContactForm";
import Accordion from "@/utiles/Accordion";
import getFacilities from "@/utiles/getFacilities";
import getPropertyDetails from "@/utiles/getPropertyDetails";
import { getPropertyImages } from "@/utiles/getPropertyImages";
import IconShow from "@/utiles/IconShow";
import ImageCarousel from "@/utiles/ImageCarousel";
import Image from "next/image";
import { IoLocation } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getPropertyPackages from "@/utiles/getPropertyPackages";
import { PropertyPackages } from "@/app/components/PropertyPackages/PropertyPackages";

export default function Page({ params }) {
  const { id } = use(params); // ✅ `use(params)` ব্যবহার করে Promise আনর‍্যাপ করা হয়েছে

  const [propertyImages, setPropertyImages] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [propertyFacilities, setPropertyFacilities] = useState([]);
  const [propertyPackages, setPropertyPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [images, details, facilities, packages] = await Promise.all([
          getPropertyImages(id),
          getPropertyDetails(id),
          getFacilities(id),
          getPropertyPackages(id),
        ]);
        setPropertyImages(images);
        setPropertyDetails(details);
        setPropertyFacilities(facilities);
        setPropertyPackages(packages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="mt-[70px]">
      <div className="container mx-auto w-[98%] md:w-[85%]">
        <div className="lg:grid grid-cols-1 bg-white rounded gap-8 pr-1 pt-1">
          {/* Property Details */}
          <div className="col-span-1 p-2">
            {loading ? (
              <div>Loading...</div>
            ) : (
              propertyDetails?.map((property, index) => (
                <div key={index}>
                  <h2 className="text-xl text-blue-900 font-semibold">
                    {property.property_name}
                  </h2>
                  <p className="flex items-center">
                    <strong>
                      <IoLocation />
                    </strong>{" "}
                    {property.address}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Image Carousel */}
          <div>
            {propertyImages?.length > 0 ? (
              <ImageCarousel propertyImages={propertyImages} />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex justify-center items-center">
                <span className="text-gray-500">No images available</span>
              </div>
            )}
          </div>
        </div>

        {/* Property Packages */}
        <div className="bg-white">
          <div className="w-full pl-4 mt-5 pt-5">
            <div className="lg:grid grid-cols-3 gap-10 rounded">
              <div className="col-span-2 pt-5">
                {loading ? <div>Loading...</div> : <PropertyPackages packages={propertyPackages} />}
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
      <ToastContainer />
    </div>
  );
}
