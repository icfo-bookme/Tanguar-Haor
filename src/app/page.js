export const dynamic = "force-dynamic";
import Image from "next/image";
import Banner from "./components/Banner/Banner";
import Property from "./components/Property/Property";
import FilterSidebar from "./components/FilterSidebar/FilterSidebar";


export default function Home() {
  return (

    <main className=" ">
      <div className="  ">
      <Banner />
      </div>
      <div className="  -mt-10 pt-10 ">
        <div className=" mt-10 w-[80%] 2xl:w-[1440px]  gap-5 mx-auto">
          {/* Sidebar */}
          <div className="w-full  col-span-3 h-auto  ">
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
