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
      <div className="grid grid-cols-10 mt-10  w-[100%] lg:w-[78%] mx-auto bg" >
        <div className="col-span-2 lg:flex hidden">
          <FilterSidebar></FilterSidebar>
        </div>
        <div className="col-span-8">
          <Property />
        </div>
        </div>
      </div>
      

    </main>


  );
}
