import { CopyrightIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Logos } from "../ui/logos"
import { Navbar } from "../ui/navbar"
import { motion } from "motion/react"

export function WhatIsIgniteSection({ section, setSection }: { section: number, setSection: (section: number) => void }) {
  const animateValue = section >= 2 ? {
    opacity: '100%',
    "--inner": "100%",
    "--outer": "100%",
  } : {
    opacity: '40%',
    "--inner": "30%",
    "--outer": "60%",
  }
  return (
    <div id="what-is-ignite" className="relative h-dvh w-full flex flex-col justify-between max-h-screen overflow-clip">
      <motion.img
        src="/images/noisy-red-mobile.png"
        className="absolute lg:hidden h-full object-cover top-0 left-0 -z-10"
        style={{
          ["--inner" as any]: "30%",
          ["--outer" as any]: "60%",
          maskImage: "radial-gradient(circle, black var(--inner), transparent var(--outer))",
          WebkitMaskImage: "radial-gradient(circle, black var(--inner), transparent var(--outer))",
        }}
        animate={animateValue}
        transition={{
          delay: 0,
          duration: 2,
          ease: "easeIn"
        }}
      />
      <motion.img
        src="/images/noisy-red-desktop.png"
        className="absolute hidden h-full object-cover top-0 left-0 lg:inline -z-10"
        style={{
          ["--inner" as any]: "30%",
          ["--outer" as any]: "60%",
          maskImage: "radial-gradient(circle, black var(--inner), transparent var(--outer))",
          WebkitMaskImage: "radial-gradient(circle, black var(--inner), transparent var(--outer))",
        }}
        animate={animateValue}
        transition={{
          delay: 0,
          duration: 2,
          ease: "easeIn"
        }}
      />

      <img />

      {/* content  */}
      <div className="h-dvh flex flex-col lg:justify-between px-8 py-16 lg:px-20 lg:py-0">
        {/* navbar  */}
        <div className="w-full hidden lg:iniline">
          <p className="text-black font-bold text-center text-[10px] lg:hidden mx-auto">
          </p>

          <div className="w-full flex justify-end">
            <Navbar className="text-black w-auto" setSection={() => { }} />
          </div>

        </div>

        <motion.div
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: .5, duration: .6, ease: "easeOut" }}
        >
          <div className="flex flex-col lg:py-20">
            <div className="font-display text-primary flex flex-col items-center lg:items-start">
              <p className="text-[25px] lg:text-[46px]">WHAT IS</p>
              <p className="text-[60px] lg:text-[135px] leading-none pt-2 lg:pt-4 lg:ml-20">IGNITE</p>
            </div>

            <div className="flex flex-col gap-2 lg:gap-6 text-[13px] lg:text-[25px] font-bold py-6 lg:py-0 lg:ml-60 mt-5 lg:mt-8">
              <p className="uppercase text-center lg:text-left">
                Ignite<CopyrightIcon className="inline ml-0.5 mb-3 lg:ml-1 lg:mb-5 size-2 lg:size-4" /> Algiers is a cultural public speaking event based on an international concept, originally developed in the United States and present in 350 cities worldwide.
              </p>

              <p className="text-black/90 font-medium uppercase text-center lg:text-left">
                Organized for the
                <b> first time </b>
                in Algeria by the
                <b> Vision & Innovation Club </b>,
                this event offers selected speakers the opportunity to take the stage and present a topic in just
                <b> 5 minutes </b>
                , with
                <b> 20 slides </b>
                that advance automatically
                <b> every 15 seconds. </b>
                <b>Ignite<CopyrightIcon className="inline ml-0.5 mb-3 lg:ml-1 lg:mb-5 size-2 lg:size-4" /> Algiers </b>
                is also enriched by inspiring talks from highly renowned guests , as well as other
                <b>artistic performances, </b>
                and
                <b> entertaining shows.</b>
              </p>
            </div>

            <div className="w-full flex justify-center lg:justify-end mt-10 lg:mt-20">
              <Button color="red" className="opacity-70 pointer-events-none">TICKET SALES COMING SOON!</Button>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 0, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: .5, duration: 1, ease: "easeOut" }}
      >
        <div className="w-full flex justify-center lg:justify-between items-end pb-6 px-8 lg:pb-10 lg:px-20">
          <Logos color="black" />
        </div>
      </motion.div>
    </div>
  )
}
