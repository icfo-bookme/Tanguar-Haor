"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper"; // ✅ Correct module import
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ImageCarousel = ({ propertyImages }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [swiperHeight, setSwiperHeight] = useState(450); // Default height for larger screens
  
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 400) {
          setSwiperHeight(200); // Set height for mobile devices
        } 
        else {
          setSwiperHeight(450); // Set height for larger screens
        }
      };
  
      // Add event listener to resize window
      window.addEventListener("resize", handleResize);
  
      // Call on mount to set initial height
      handleResize();
  
      // Cleanup event listener
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
  

    if (!propertyImages || propertyImages.length === 0) {
        return <p className="text-center text-gray-500">No images available</p>;
    }

    return (
        <div className="relative w-full max-w-5xl mx-auto  ">
            {/* Main Image Swiper */}
            <div className="relative w-full h-full "> {/* Set height here */}
                <Swiper
                    loop={true}
                    spaceBetween={2}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2 "
                    style={{ height: `${swiperHeight}px` }} // Use dynamic height
                >
                    {propertyImages.map((image, index) => (
                        <SwiperSlide key={index } className="w-[100%] h-[100%]">
                            <div className="relative  rounded-xl w-full h-full">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${image.path}`}
                                        alt={`Property Image ${index + 1}`}
                                        fill
                                         // Set height as per your requirement
                                        className="object-cover rounded-xl"
                                        sizes="(max-width: 768px) 100vw,"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Thumbnail Swiper */}
            <div className="mt-4">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                    style={{height:"110px"}}
                >
                    {propertyImages.map((image, index) => (
                        <SwiperSlide key={index} className="w-[30%] h-[100%]">
                            <div className="relative w-full h-full cursor-pointer border-2 rounded-xl transition-all">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${image.path}`}
                                    alt={`Thumbnail ${index + 1}`}
                                 fill
                                    className="object-cover rounded-xl w-full h-full"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ImageCarousel;
