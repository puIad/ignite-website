import { AnimatePresence, motion } from "motion/react"
import { FormOne } from "../form/form-1";
import { FormTwo } from "../form/form-2";
import { FormThree } from "../form/form-3";
import { LangChoser } from "../form/lang-choser";
import { formStore } from "../form/schema";
import { Logos } from "../ui/logos";
import { TimeLocationTag } from "../ui/time-location-tag";
import { useEffect, useRef } from "react";

export function SpeakersRegistration({ section }: { section: number }) {
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
  // keep the form wrapper's lang/dir in sync with the selected language and current step
  useEffect(() => {
    const wrapper = document.getElementById("speakers-registration-form");
    if (!wrapper) return;
    if (step === 0) {
      wrapper.removeAttribute("dir");
      wrapper.classList.remove("lang-ar");
      wrapper.classList.remove("lang-fr");
      wrapper.classList.remove("lang-en");
      return;
    }

    // set only direction on the wrapper; mark the wrapper with a CSS class so
    // we know which language is active for layout. Actual Madani font will
    // be applied only to elements with lang="ar" (see App.css).
    if (lang === "AR") {
      wrapper.setAttribute("dir", "rtl");
      wrapper.classList.add("lang-ar");
      wrapper.classList.remove("lang-fr");
      wrapper.classList.remove("lang-en");
    } else if (lang === "FR") {
      wrapper.setAttribute("dir", "ltr");
      wrapper.classList.add("lang-fr");
      wrapper.classList.remove("lang-ar");
      wrapper.classList.remove("lang-en");
    } else {
      wrapper.setAttribute("dir", "ltr");
      wrapper.classList.add("lang-en");
      wrapper.classList.remove("lang-ar");
      wrapper.classList.remove("lang-fr");
    }
  }, [step, lang]);
  // when the step changes, smoothly align and focus the relevant control
  // NOTE: track previous step to avoid running on initial mount (which caused
  // the language chooser to be focused by default).
  const prevStepRef = useRef<number | null>(null);
  useEffect(() => {
    const wrapper = document.getElementById("speakers-registration-form");
    if (!wrapper) return;

    const prev = prevStepRef.current;

    // If we transitioned to step 0 from a non-zero step, focus the chooser.
    if (step === 0 && prev !== null && prev !== 0) {
      const chooser = document.getElementById("lang-choser");
      if (!chooser) return;
      const firstButton = chooser.querySelector("button") as HTMLElement | null;
      try {
        if (firstButton) firstButton.focus({ preventScroll: true } as any);
      } catch (e) {
        if (firstButton) firstButton.focus();
      }

      prevStepRef.current = step;
      return;
    }

    // Only run the form-step focus/scroll when we are on a form step (1..3)
    if (step > 0) {
      // wrapper.scrollIntoView({ behavior: "smooth", block: "start" });
      const selector = 'input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled])';
      const first = wrapper.querySelector(selector) as HTMLElement | null;
      if (!first) {
        prevStepRef.current = step;
        return;
      }

      try {
        (first as HTMLElement).focus({ preventScroll: true } as any);
      } catch (e) {
        (first as HTMLElement).focus();
      }

    }

    prevStepRef.current = step;
  }, [step]);
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
        transition={{ delay: 5, duration: 1, ease: "easeOut" }}
        className="h-full w-full px-4 py-0 lg:px-20 lg:py-8 flex flex-col justify-start">

        <div className="h-full w-full flex flex-col gap-6 lg:gap-10">
          <p className={`text-[41px] lg:text-[65px] font-display text-primary text-center mt-10 lg:mt-0 ${lang === 'AR' ? 'font-splart' : ''}`}>
            SPEAKERS REGISTRATION
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
                className="bg-primary/4 border-primary/40 border h-[50vh] lg:h-[70vh] overflow-y-scroll lg:px-50 py-10 lg:py-20 backdrop-blur-3xl w-full transition-all duration-300 ease-out flex justify-center"
              >
                {step === 0 && <LangChoser />}
                {step === 1 && <FormOne />}
                {step === 2 && <FormTwo />}
                {step === 3 && <FormThree />}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="mt-4" >
        <Logos color="black" />
      </div>
      {/* <div className="w-full flex justify-between lg:justify-between items-end pb-6 px-3 lg:px-20"> */}
      {/*   <TimeLocationTag /> */}
      {/* </div> */}
    </div>
  );
}
