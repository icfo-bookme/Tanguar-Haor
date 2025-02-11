"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const ImageCarousel = ({ propertyImages }) => {
     const [currentIndex, setCurrentIndex] = useState(1); // Default to second image

     useEffect(() => {
          if (propertyImages.length > 1) {
               setCurrentIndex(1); // Ensure the second image is active on first load
          }
     }, [propertyImages]);

     const handleSlideChange = (swiper) => {
          setCurrentIndex(swiper.activeIndex);
     };

     return (
          <div className="relative w-full max-w-5xl mx-auto mt-7">
              
<Swiper
    effect="coverflow"
    grabCursor={true}
    centeredSlides={true}
    spaceBetween={30}
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 150,
        modifier: 1.2,
        slideShadows: false,
    }}
    pagination={{ clickable: true }}
    modules={[EffectCoverflow, Pagination, Autoplay]}
    onSlideChange={handleSlideChange}
    className="swiper mySwiper"
    breakpoints={{
        320: { slidesPerView: 1 }, 
        768: { slidesPerView: 3 }, 
    }}
>

                    {propertyImages.map((image, index) => (
                         <SwiperSlide key={index}>
                              <div
                                   className={`relative w-full h-96 transition-all ${
                                        index === currentIndex ? "scale-105" : "opacity-80"
                                   }`}
                              >
                                   <Image
                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${image.path}`}
                                        alt={`Property Image ${index + 1}`}
                                        layout="fill"
                                        className="object-cover rounded-xl shadow-lg"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                   />
                              </div>
                         </SwiperSlide>
                    ))}
               </Swiper>

               {/* Thumbnail Preview */}
               <div className="flex gap-2 mt-4 overflow-x-auto justify-center">
                    {propertyImages.map((image, index) => (
                         <div
                              key={index}
                              className={`w-16 h-16 relative cursor-pointer border-2 rounded-lg transition-all ${
                                   index === currentIndex ? "border-blue-500 scale-110" : "border-transparent"
                              }`}
                              onClick={() => setCurrentIndex(index)}
                         >
                              <Image
                                   src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${image.path}`}
                                   alt={`Thumbnail ${index + 1}`}
                                   layout="fill"
                                   className="object-cover rounded-lg"
                              />
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default ImageCarousel;
