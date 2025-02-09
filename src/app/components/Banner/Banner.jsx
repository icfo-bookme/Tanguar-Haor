"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function Banner() {
  const autoplayDelay = 3000;

  return (
    <section className="relative -mt-6 h-[56vh] p-0 m-0">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
        className="h-full"
      >
        <SwiperSlide>
          <img
            src="https://images.unsplash.com/photo-1735627062325-c978986b1871?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D"
            alt="Slide 1"
            className="object-cover w-full h-full"
            width="1374"
            height="2000"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://plus.unsplash.com/premium_photo-1700346339061-9755dcc26bd9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D"
            alt="Slide 2"
            className="object-cover w-full h-full"
            width="1374"
            height="2000"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://images.unsplash.com/photo-1738599778390-af77d7cf10e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8RnpvM3p1T0hONnd8fGVufDB8fHx8fA%3D%3D"
            alt="Slide 3"
            className="object-cover w-full h-full"
            width="1374"
            height="2000"
          />
        </SwiperSlide>
      </Swiper>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
      <div className="absolute inset-0 flex items-center h-full px-4 md:px-8 z-20">
        <div className="text-white w-full lg:w-3/5 space-y-6 pl-8 lg:pl-16 text-left">
          <h4 className="text-xl lg:text-4xl font-bold mb-4 animate__animated animate__fadeInUp">
            Plan tours to dream <br /> locations in just a click!
          </h4>
          <p className="text-base sm:text-[16px] animate__animated animate__fadeInUp animate__delay-1s">
            Travel is a transformative and enriching experience that allows
            individuals to explore new destinations, cultures, and landscapes.
          </p>
        </div>
      </div>
    </section>
  );
}
