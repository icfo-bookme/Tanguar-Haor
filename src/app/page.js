export const dynamic = "force-dynamic";
import Image from "next/image";
import Banner from "./components/Banner/Banner";
import Property from "./components/Property/Property";
import FilterSidebar from "./components/FilterSidebar/FilterSidebar";


export default function Home() {
  return (

    <main className="">

      <Banner />
      <div className="grid grid-cols-7 mt-10 gap-5 w-[100%] lg:w-[90%] mx-auto" >
        <div className="col-span-2 lg:flex hidden">
          <FilterSidebar></FilterSidebar>
        </div>
        <div className="col-span-5">
          <Property />
        </div>

      </div>
      

    </main>


  );
}
