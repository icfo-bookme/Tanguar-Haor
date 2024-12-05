import React from "react";

export default function Banner() {
  return (
    <section className="relative -mt-6 h-[40vh] md:h-[50vh] sm:h-[50vh] p-0 m-0">
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="w-full h-full object-cover"
          poster="/assets/images/hero/hero-three-banner.png"
          loop
          autoPlay
          muted
        >
          <source src="/assets/images/videos/travel1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div> {/* Overlay */}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center h-full px-4 md:px-8">
        <div className="text-white w-full lg:w-3/5 space-y-6 pl-8 lg:pl-16 text-left">
          <h4 className="text-xl lg:text-4xl font-bold mb-4 animate__animated animate__fadeInUp">
            Plan tours to dream <br /> locations in just a click!
          </h4>
          <p className="text-base sm:text-[8px] animate__animated animate__fadeInUp animate__delay-1s">
            Travel is a transformative and enriching experience that allows
            individuals to explore new destinations, cultures, and landscapes.
          </p>
        </div>
      </div>
    </section>
  );
}
