export const dynamic = "force-dynamic";
import Image from "next/image";
import Banner from "./components/Banner/Banner";
import Property from "./components/Property/Property";
import FilterSidebar from "./components/FilterSidebar/FilterSidebar";


export default function Home() {
  return (

    <main className="max-w-[1440px] mx-auto">
      <div className="mt-[55px] md:mt-[66px] ">
      <Banner />
      </div>
      <div className="bg-[#EBF0F4] -mt-10 pt-10 ">
        <div className=" mt-10 w-[100%] lg:w-[80%] gap-5 mx-auto">
          {/* Sidebar */}
          <div className="w-full hidden md:block col-span-3 h-auto  ">
            <FilterSidebar />
          </div>

          {/* Main Content */}
          <div className=" ">
            <Property />
          </div>
        </div>
      </div>



    </main>


  );
}
