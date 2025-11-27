import { AnimatePresence, motion } from "motion/react"
import { LangChoser } from "../form/lang-choser";
import { formStore } from "../form/schema";
import { Logos } from "../ui/logos";
import { useEffect, useRef } from "react";

export function BuyTicketForm({ section }: { section: number }) {
  const animateValue = section >= 4 ? {
    opacity: '100%',
    "--inner": "100%",
    "--outer": "100%",
  } : {
    opacity: '0%',
    "--inner": "30%",
    "--outer": "60%",
  }
  const lang = formStore((state) => state.lang);
  const step = formStore((state) => state.step);
  const setStep = formStore((state) => state.setStep);
  if (!lang) setStep(0);
  useEffect(() => {
  }, [step, lang]);

  return (
    <div className="relative flex flex-col justify-between h-dvh w-screen" id={"speakers-registration"}>
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

      <motion.div
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0, duration: 1, ease: "easeOut" }}
        className="h-full w-full px-4 py-0 lg:px-20 lg:py-8 flex flex-col justify-start overflow-y-scroll">

        <div className="h-full w-full flex flex-col items-center lg:justify-center gap-6 lg:gap-3 overflow-y-scroll">
          <p className="text-[41px] lg:text-[65px] font-display text-primary text-center mt-10 lg:mt-0">
            BUY YOUR TICKET
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: .3 }}
            >
              <div
                id="speakers-registration-form"
                className="h-[70dvh] bg-primary/4 border-primary/40 border lg:px-60 py-10 lg:py-10 backdrop-blur-3xl w-full transition-all duration-300 ease-out flex justify-center overflow-y-scroll"
              >
                <LangChoser />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="mb-10 mt-5" >
        <Logos color="black" />
      </div>
    </div>
  );
}
