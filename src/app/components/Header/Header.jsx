"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import Link from "next/link";
import { Roboto } from "next/font/google";
import { useForm } from "react-hook-form";
import { useSearch } from "@/SearchContext";
import getContactNumber from "@/utiles/getContactNumber";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });


const Header = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [contactNumber, setContactNumber]=useState([])
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getContactNumber();
        console.log(result)
        setContactNumber(result)
      } catch (error) {
        console.error("Error fetching contact number data:", error);
      }
    }
    fetchData();
  }, []);
  const onSubmit = (data) => {
    setSearchTerm(data.property);
    
  };

  return (
    <header className={`header-area-three ${roboto.className} bg-white`}>
      <div className="main-header fixed w-full  z-20  bg-white shadow-md shadow-slate-500">
       
        <div className="header-bottom  text-[#00026E]  ">
          <div className="container  w-[95%] lg:w-[84%]  mx-auto">
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
                    style={{backgroundColor:"white", color:"white"}}
                  />
                </Link>
              </div>
              <div className="hidden lg:block">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 p-[5px] border rounded-lg shadow-lg w-96 mx-auto"
                >
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

           
              <div className="ml-3 hidden lg:flex items-center justify-center gap-2">
               

                <div className="flex items-center ">
                <Link href={`https://wa.me/${contactNumber[0]?.value}`} className=" mx-[10px] mt-[9px]"  target="_blank" 
  rel="noopener noreferrer" >
  <div className="phone-call md:w-[50px] md:h-[50px] w-[36px] h-[36px]  ml-[15px]" >
  <FaPhone className="i md:ml-[17px] md:mt-[17px] mt-[8px] ml-[11px]" />

                                        </div>
                            </Link>
                            <Link  href={`https://wa.me/${contactNumber[0]?.value}`} className=" mx-[10px]"  target="_blank" 
  rel="noopener noreferrer">
                               <span className="btn-whatsapp-pulse btn-whatsapp-pulse-border md:w-[50px] md:h-[50px] w-[36px] h-[36px] md:mt-[0px] mt-[-5px] ml-[15px]">
        
        <FaWhatsapp className="w-[25px] h-[25px] text-white" />
</span>
                            </Link>

                  <div>
                    <p className="text-sm text-gray-900">Call Anytime</p>
                    <h4 className="text-lg font-semibold">
                      <a href="#" className="text-gray-800">
                        {contactNumber[0]?.value?.slice(3)}
                      </a>
                    </h4>
                  </div>
                </div>
              </div>
              {/* Mobile Menu Icon */}
              <div className="lg:hidden flex items-center mt-[10px]">
                <span className="text-[8px] md:text-[16px]">Call any time</span>
              <Link target="_blank" 
  rel="noopener noreferrer" href={`https://wa.me/${contactNumber[0]?.value}`} className="w-[38px] h-[38px] mt-[-5px]">
                    <div className="phone-call md:w-[50px] md:h-[50px] w-[36px] h-[36px]  ml-[15px]" >
  <FaPhone className="i md:ml-[15px] md:mt-[15px] mt-[9px] ml-[10px]" />

                                        </div>
                  </Link>
                  <Link target="_blank" 
  rel="noopener noreferrer" href={`https://wa.me/${contactNumber[0]?.value}`} className="w-[38px] h-[38px] mx-[20px] mt-[-5px]">
                    <span className="btn-whatsapp-pulse btn-whatsapp-pulse-border md:w-[50px] md:h-[50px] w-[36px] h-[36px]  ml-[15px]">
        
        <FaWhatsapp className="w-[25px] h-[25px] text-white" />


</span>
                  </Link>
                  </div>
              
            </div>
          </div>
        </div>

      
      </div>
    </header>
  );
};

export default Header;
