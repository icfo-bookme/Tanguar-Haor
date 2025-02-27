"use client"
// export const dynamic = "force-dynamic";
import { Footer } from "flowbite-react";
import Banner from "./components/Banner/Banner";
import Header from "./components/Header/Header";
import Property from "./components/Property/Property";
import { useState } from "react";


export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (

    <main className=" ">
                <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className=" w-[100%] pt-[40px] md:pt-[50px]">
      <Banner />
      </div>
      <div className="   py-10 ">
        <div className=" mt-10 w-[98%] md:w-[80%] 2xl:w-[1440px]  gap-5 mx-auto ">
         

          {/* Main Content */}
          <div className=" ">
            <Property searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </div>
      </div>


      <Footer />

    </main>


  );
}
