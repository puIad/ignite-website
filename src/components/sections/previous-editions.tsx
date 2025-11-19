import { Button } from "../ui/button";
import { Logos } from "../ui/logos";

export function PreviousEditionsSection() {
  return (
    <div id="previous-editions" className="relative min-h-screen bg-primary w-screen text-white px-8 py-4 lg:px-20 lg:py-12">
      <img src="/images/image-to-blend.png" className="mix-blend-multiply absolute top-0 left-0 z-10 h-full object-cover" />


      <div className="z-20">
        {/* top */}
        <div className="w-full flex justify-center">
          <p className="text-white font-bold text-[12px] lg:text-[16px]"></p>
        </div>

        {/* content   */}
        <div className="w-full flex flex-col justify-center gap-5 mt-10 lg:mt-16">
          <p className="font-display text-[41px] leading-[1.2] lg:leading-none lg:text-[64px] uppercase text-center">previous editions</p>

          <div className="w-full flex flex-col lg:flex-row border border-[#FF6F00] lg:mt-4">
            {/* first one  */}

            <div className="relative overflow-hidden space-y-20 lg:h-[855px] flex-1 z-20 p-4 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#FF6F00]">
              <img src="/images/edition-2024.webp" className="absolute object-cover h-full w-full top-0 right-0 -z-10" />

              <div className="space-y-20 z-20">
                <div className="text-[17px] lg:text-[44px]">
                  <p className="font-display">Third Edition</p>
                  <p className="font-display">2023</p>
                </div>

                <div className="flex flex-col gap-1 text-[14px] lg:text-[32px]">
                  <p><span className="font-bold mr-2">250 </span><span>Attendees</span></p>
                  <p><span className="font-bold mr-2">14</span><span>Speakers</span></p>
                </div>

                <div className="space-y-4">
                  <p className="text-[12px] lg:text-[25px] uppercase font-display">Special Guests</p>
                  <div className="uppercase text-[10px] lg:text-[20px] space-y-1 lg:space-y-2">
                    <p className="">MOHAMMED YOUNES CHERHABIL</p>
                    <p className="">OUERDIA OUSMER </p>
                    <p className="">MOHAMMED MOUZAOUI </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden  space-y-20 lg:h-[855px] flex-1 z-20 p-4 lg:p-12">
              <img src="/images/edition-2023.webp" className="absolute object-cover h-full w-full top-0 right-0 -z-10" />

              <div className="text-[17px] lg:text-[44px]">
                <p className="font-display">Fourth Edition</p>
                <p className="font-display">2024</p>
              </div>

              <div className="flex flex-col gap-1 text-[14px] lg:text-[32px]">
                <p><span className="font-bold">700</span><span> Attendees</span></p>
                <p><span className="font-bold">13</span><span> Speakers</span></p>
              </div>

              <div className="space-y-4">
                <p className="text-[12px] lg:text-[25px] uppercase font-display">Special Guests</p>
                <div className="uppercase text-[10px] lg:text-[20px] space-y-1">
                  <p className="">Dr BAGHDADI</p>
                  <p className="">AMINE DIB</p>
                  <p className="">Dr SALAH EDDINE KHALED </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center pt-7 z-50">
            <Button color="white z-50">REGISTER TO SPEAK AT IGNITE</Button>
          </div>
        </div>

        {/* footer  */}

        <div className="w-full flex justify-center lg:justify-end items-end mt-10">
          <Logos color="white" />
        </div>

      </div>
    </div>
  )

}
