import { AnimatedNumber } from "../ui/animated-number";
import { Button } from "../ui/button";
import { motion } from "motion/react"
export function PreviousEditionsSection({ setSection }: { setSection: (section: number) => void }) {
  return (
    <div id="previous-editions" className="bg-primary w-screen h-screen text-white px-8 py-4 lg:px-20 lg:py-0">
      <img src="/images/blended-image.png" className="absolute top-0 left-0 z-10 h-screen w-full object-cover" />
      <div className="z-20 h-full flex lg:items-center">
        <div className="w-full flex flex-col lg:justify-center gap-5 mt-4 lg:mt-0">
          <motion.p
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: .2, duration: 1, ease: "easeOut" }}
            className="font-display text-[25px] leading-[1.2] lg:leading-none lg:text-[64px] uppercase text-center z-200">previous editions</motion.p>

          <motion.div
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
            className="w-full h-[76vh] lg:h-[62vh] flex flex-col justify-start lg:flex-row border z-100 border-[#FF6F00] lg:mt-4">

            <div className="relative overflow-hidden space-y-6 lg:space-y-20 h-[50%] lg:h-full w-full z-20 p-4 py-6 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#FF6F00]">
              <img src="/images/edition-2024.webp" className="absolute object-cover h-full w-full top-0 right-0 -z-10" />

              <div className="text-[17px] lg:text-[44px]">
                <p className="font-display">Third Edition</p>
                <p className="font-display">2023</p>
              </div>

              <div className="flex flex-col gap-1 text-[14px] lg:text-[32px]">
                <div className="flex gap-1 lg:gap-2"><AnimatedNumber className="font-bold mr-2 text-[14px] lg:text-[32px]">400</AnimatedNumber><p>Attendees</p></div>
                <div className="flex gap-1 lg:gap-2"><AnimatedNumber className="font-bold mr-2 text-[14px] lg:text-[32px]">14</AnimatedNumber><p>Speakers</p></div>
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

            <div className="relative overflow-hidden space-y-6 lg:space-y-20 h-[50%] lg:h-full w-full   z-20 p-4 py-6 lg:p-12">
              <img src="/images/edition-2023.webp" className="absolute object-cover h-full w-full top-0 right-0 -z-10" />

              <div className="text-[17px] lg:text-[44px]">
                <p className="font-display">Fourth Edition</p>
                <p className="font-display">2024</p>
              </div>

              <div className="flex flex-col gap-1 text-[14px] lg:text-[32px]">
                <div className="flex gap-1 lg:gap-2"><AnimatedNumber className="font-bold mr-2 text-[14px] lg:text-[32px]">700</AnimatedNumber><p>Attendees</p></div>
                <div className="flex gap-1 lg:gap-2"><AnimatedNumber className="font-bold mr-2 text-[14px] lg:text-[32px]">13</AnimatedNumber><p>Speakers</p></div>
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
          </motion.div>

          <div className="w-full justify-center pt-2 lg:pt-10 z-50">
            <Button color="white z-100" onClick={() => setSection(4)}>REGISTER TO SPEAK AT IGNITE</Button>
          </div>

        </div>
      </div>
    </div>
  )

}
