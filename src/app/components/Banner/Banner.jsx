"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";

export default function Banner() {
  const autoplayDelay = 3000;

  return (
    <section className="relative h-[56vh] w-full p-0 m-0">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
        className="h-full"
      >
        <SwiperSlide>
          <div>
            <Image
              src="/assets/images/gallery/home-slider-top/slider1.jpg"
              alt="Slide 1"
              fill
              className="object-cover w-full h-full"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <Image
              src="/assets/images/gallery/home-slider-top/slider2.jpg"
              alt="Slide 2"
              fill
              className="object-cover w-full h-full"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <Image
              src="/assets/images/gallery/home-slider-top/slider3.jpg"
              alt="Slide 3"
              fill
              className="object-cover w-full h-full"
            />
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
      <div className="absolute inset-0 flex items-center h-full px-4 md:px-8 z-20">
        <div className="text-white w-full lg:w-3/5 space-y-6 pl-8 lg:pl-16 text-left">
          <h4 className="sm:text-3xl ml-[-20px] md:ml-[0px] text-[20px] lg:text-4xl font-bold mb-4 animate__animated animate__fadeInUp">
            Plan tours to dream <br /> locations in just a click!
          </h4>
          <p className="ml-[-20px] md:ml-[0px] text-[12px] sm:text-[16px] animate__animated animate__fadeInUp animate__delay-1s">
            Travel is a transformative and enriching experience that allows
            individuals to explore new destinations, cultures, and landscapes.
          </p>
        </div>
      </div>
    </section>
  );
}