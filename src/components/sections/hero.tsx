import { Button } from "../ui/button";
import { Logos } from "../ui/logos";
import { Navbar } from "../ui/navbar";
import { TimeLocationTag } from "../ui/time-location-tag";

export function HeroSection() {
  return (
    <main className="relative min-h-screen w-screen text-white ">
      <div className="absolute bg-blue-100 w-screen h-screen -z-10">
        <img
          src="/images/main-bg.webp"
          className="object-cover h-full w-full hidden lg:inline" />

        <img
          src="/images/main-bg-mobile.webp"
          className="object-cover h-full w-full lg:hidden" />

      </div>
      <div className="z-20 h-screen relative px-8 py-8 lg:px-20 lg:py-12 flex flex-col justify-between">
        <div className="w-full flex items-start justify-between">
          <p className="text-[14px]  hidden lg:inline"></p>
          <div className="lg:hidden">
            <TimeLocationTag className="text-white" />
          </div>
          <Navbar />
          <p className="text-[14px] hidden lg:inline"></p>
        </div>


        <div className="w-full flex justify-between lg:hidden uppercase">
          <p className="text-[12px] font-bold uppercase">Got an idea <br /> worth sharing? </p>
          <p className="text-[12px] font-bold uppercase">Claim your <br /> five minutes</p>
        </div>

        <div className="w-full relative h-[60px] lg:pt-25">
          <p className="text-[20px] font-bold hidden lg:inline uppercase absolute left-0 leading-[1.2]">Got an idea <br /> worth sharing? </p>
          <Button size="lg" className="absolute left-1/2 -translate-x-1/2 text-nowrap">REGISTER TO SPEAK AT IGNITE</Button>
          <p className="text-[20px] font-bold hidden lg:inline uppercase absolute right-0 leading-[1.2]">Claim your <br /> five minutes</p>
        </div>

        <div className="w-full flex flex-col lg:flex-row justify-center gap-[87px] lg:gap-0 lg:justify-between items:center lg:items-end">
          <p className="text-[12px] lg:text-[16px] max-w-[700px] uppercase text-center lg:text-left">
            Back for its 5th Edition, we are gathering the city’s brightest minds and boldest voices.
            No delays, just pure passion. Can you tell your story before the timer hits zero?
          </p>
          <Logos />
        </div>

      </div>
    </main>
  )
}
