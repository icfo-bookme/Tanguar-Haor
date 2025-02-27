"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { Roboto } from "next/font/google";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useForm } from "react-hook-form";
const roboto = Roboto({ subsets: ["latin"], weight: ['400',],  });

// Initialize the font loader at the module scope
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const Header = ({setSearchTerm,searchTerm}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Update the searchTerm based on input field
    setSearchTerm(data.property);
    // console.log(data.property)
    // console.log(searchTerm)
  };



  return (
    <header className={`header-area-three ${roboto.className}`}>
      <div className="main-header fixed w-full z-20  bg-white shadow-md shadow-slate-500">
        {/* Header Top */}

        {/* Header Bottom */}
        <div className="header-bottom  text-[#00026E]  ">
          <div className="container  w-[84%]  mx-auto">
            <div className="flex justify-between items-center py-2">
              {/* Logo */}
              <div className="logo">
                <Link href="/">
                  <Image
                    src="/assets/images/tangular-logo.svg" // Adjust the path based on your public folder structure
                    alt="logo"
                    width={190}
                    height={60}
                    className="changeLogo"
                  />
                </Link>
              </div>
              <div className="hidden lg:block">

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-[5px] border rounded-lg shadow-lg w-96 mx-auto">
              <input
                  {...register("property")}
                  type="text"
                  value={searchTerm}
                  className="w-full p-2 border rounded-md"
                  onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search property"

                />
                </form>
                </div>


              {/* Navigation - Desktop and Tablet */}
              {/* <nav className="hidden lg:flex space-x-10 font-semibold">
                <Link href="/" className="text-gray-900 hover:text-blue-500">
                  Home
                </Link>
                <Link
                  href="/places"
                  className="text-gray-900 hover:text-blue-500"
                >
                  Flight
                </Link>
                <Link
                  href="/how-it-works"
                  className="text-gray-900 hover:text-blue-500"
                >
                  Hotel
                </Link>
                <Link
                  href="/tips"
                  className="text-gray-900 hover:text-blue-500"
                >
                  Tour
                </Link>
                <Link
                  href="/news"
                  className="text-gray-900 hover:text-blue-500"
                >
                  visa
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-900 hover:text-blue-500"
                >
                  Contact
                </Link>
              </nav> */}
                           

              <div className="ml-3 hidden lg:flex items-center justify-center gap-2">
              {/* <Link href="/" className="">
              <FaSquarePhone size={35} className="text-[#0F5393]" />
              
                </Link> */}
                  
                  <div className="flex items-center ">
                  <Link href="/" className="w-[48px] h-[48px] ">
                  <DotLottieReact loop autoplay src="/whatsapp-animation.json"/>

                </Link>
                  <Link href="/" className="w-[48px] h-[48px] mx-[20px]">
                  <DotLottieReact loop autoplay  src="/call-animation.json"/>

                 
                </Link>
                  
                  
                <div>
                    <p className="text-sm text-gray-900">Call Anytime</p>
                    <h4 className="text-lg font-semibold">
                      <a href="#" className="text-gray-800">
                        00 (888) +123456
                      </a>
                    </h4>
                  </div>
                  </div>
                
                </div>
              {/* Mobile Menu Icon */}
              <div className="lg:hidden flex items-center">
                <button onClick={toggleMobileMenu}>
                  <FiMenu size={30} className="text-gray-800" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Conditional Rendering */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 ">
            <div className="flex justify-between items-center bg-white p-4">
              <div className="logo">
                <Link href="/">
                <Image
                    src="/assets/images/tangular-logo.svg" // Adjust the path based on your public folder structure
                    alt="logo"
                    width={150}
                    height={50}
                    className="changeLogo"
                  />
                </Link>
              </div>
              <button onClick={toggleMobileMenu}>
                <IoClose size={30} className="text-gray-800" />
              </button>
            </div>


            <nav className="flex flex-col items-center space-y-4 py-4 bg-white">
            
            <div className="flex items-center justify-center gap-2">
            <Link href="/" className="w-[36px] h-[36px]">
                  <Image
                    src="/assets/images/w.svg"
                    alt="logo"
                    width={40}
                    height={40}
                  />
                </Link>
              <Link href="/" className="w-[36px] h-[36px]">
                  <Image
                    src="/assets/images/c.svg"
                    alt="logo"
                    width={40}
                    height={40}
                  />
                </Link>
                  <div>
                    <p className="text-sm text-gray-900">Call Anytime</p>
                    <h4 className="text-lg font-semibold">
                      <a href="#" className="text-gray-800">
                        00 (888) +123456
                      </a>
                    </h4>
                  </div>
               
                </div>
             
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
