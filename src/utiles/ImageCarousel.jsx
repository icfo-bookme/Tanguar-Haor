"use client";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const ImageCarousel = ({ propertyImages }) => {
     const [currentIndex, setCurrentIndex] = useState(0);

     const handleSlideChange = (swiper) => {
          setCurrentIndex(swiper.activeIndex);
     };

     return (
          <div className="relative w-full max-w-4xl mx-auto">
                <Swiper
                     effect={"coverflow"}
                     grabCursor={true}
                     centeredSlides={true}
                     slidesPerView={"auto"}
                     coverflowEffect={{
                          rotate: 50,
                          stretch: 0,
                          depth: 100,
                          modifier: 1,
                          slideShadows: true,
                     }}
                     pagination={{ clickable: true }}
                     modules={[EffectCoverflow, Pagination]}
                     onSlideChange={handleSlideChange}
                     className="swiper mySwiper"
                >
                     {propertyImages.map((image, index) => (
                          <SwiperSlide key={index}>
                                <div className="relative w-full h-96">
                                     <Image
                                          src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${image.path}`}
                                          alt={`Property Image ${index + 1}`}
                                          layout="fill"
                                          className="object-cover rounded-lg shadow"
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
