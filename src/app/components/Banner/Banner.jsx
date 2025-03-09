"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";
import { Roboto } from "next/font/google";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function Banner() {
  return (
    <section className={`${raleway.className} relative h-[60vh] z-10 w-full`}>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          // bulletClass: "custom-bullet", // Add a custom class
          // bulletActiveClass: "custom-bullet-active"
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true} // Ensures infinite looping
        className="h-full relative w-[100%] "
      >
        <SwiperSlide className="w-[100%] h-[100%]">
          <Image
            src="/assets/images/gallery/home-slider-top/slider1.jpg"
            alt="Slide 1"
            fill
            className="object-contain md:object-fill w-full h-full"
          />
        </SwiperSlide>
        <SwiperSlide className="w-[100%] h-[100%]">
          <Image
            src="/assets/images/gallery/home-slider-top/slider2.jpg"
            alt="Slide 2"
            fill
            className="object-contain md:object-fill w-full h-full"
          />
        </SwiperSlide>
        <SwiperSlide className="w-[100%] h-[100%]">
          <Image
            src="/assets/images/gallery/home-slider-top/slider3.jpg"
            alt="Slide 3"
            fill
            className="object-contain md:object-fill w-full h-full"
          />
        </SwiperSlide>
      </Swiper>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10 pointer-events-none"></div>

      {/* Text Content */}
      <div className="absolute inset-0 flex items-center h-full px-4 md:px-8 z-20 pointer-events-none">
        <div className="font-heading text-white w-full lg:w-3/5 space-y-6 pl-8 lg:pl-16 text-left">
          <h4 className="sm:text-3xl text-[20px] lg:text-4xl font-bold mb-4">
            Plan tours to dream <br /> locations in just a click!
          </h4>
          <p className="text-[12px] sm:text-[16px]">
            Travel is a transformative and enriching experience that allows
            individuals to explore new destinations, cultures, and landscapes.
          </p>
        </div>
      </div>

      {/* Fix Pagination Clickability */}
      
    </section>
  );
}
