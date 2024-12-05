export const dynamic = "force-dynamic";
import Image from "next/image";
import Banner from "./components/Banner/Banner";
import Property from "./components/Property/Property";
import FilterSidebar from "./components/FilterSidebar/FilterSidebar";


export default function Home() {
  return (

    <main className="">

      <Banner />
      <div className="bg-[#EBF0F4] -mt-10 pt-10">
        <div className="md:grid grid-cols-11 mt-10 w-[100%] lg:w-[85%] gap-5 mx-auto">
          {/* Sidebar */}
          <div className="w-full hidden md:block col-span-3 h-auto bg-white p-2 border rounded-lg shadow">
            <FilterSidebar />
          </div>

          {/* Main Content */}
          <div className="col-span-8 ">
            <Property />
          </div>
        </div>
      </div>



    </main>


  );
}
