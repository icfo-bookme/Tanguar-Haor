import Banner from "./components/Banner/Banner";
import Property from "./components/Property/Property";


export default function Home() {
  return (
    <main className=" ">
      <div className=" w-[100%] pt-[40px] md:pt-[50px]">
        <Banner />
      </div>
      <div className=" py:[20px]  md:py-10 ">
        <div className=" mt-[12px] md:mt-10 w-[98%] md:w-[80%] 2xl:w-[1440px]  gap-5 mx-auto ">
          {/* Main Content */}
          <div className=" overflow-hidden">
            <Property />
          </div>
        </div>
      </div>

    </main>
  );
}