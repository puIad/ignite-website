import { FormOne } from "../form/form-1";
import { FormTwo } from "../form/form-2";
import { FormThree } from "../form/form-3";
import { LangChoser } from "../form/lang-choser";
import { formStore, uiTexts } from "../form/schema";
import { Logos } from "../ui/logos";
import { TimeLocationTag } from "../ui/time-location-tag";
import { useEffect } from "react";

export function SpeakersRegistration() {
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
  // when the step changes (to a form step), focus and smoothly scroll to the first input
  useEffect(() => {
    const wrapper = document.getElementById("speakers-registration-form");
    if (!wrapper) return;
    // only focus when we are on a form step (1..3)
    if (step === 0) return;

    // find the first focusable form control (input/textarea/select)
    const selector = 'input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled])';
    const first = wrapper.querySelector(selector) as HTMLElement | null;
    if (!first) return;

    // Try to focus without scrolling, then smooth-scroll into view for better UX
    try {
      // modern browsers support preventScroll
      (first as HTMLElement).focus({ preventScroll: true } as any);
    } catch (e) {
      (first as HTMLElement).focus();
    }
    try {
      (first as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (e) {
      // fallback: instant scroll
      (first as HTMLElement).scrollIntoView();
    }
  }, [step]);
  return (
    <div className="relative w-full min-h-screen" id={"speakers-registration"}>
      <img
        src="/images/noisy-red-mobile.webp"
        className="absolute lg:hidden h-full object-cover  top-0 left-0 -z-10"
      />
      <img
        src="/images/noisy-red-desktop.webp"
        className="absolute hidden h-full object-cover top-0 left-0 lg:inline -z-10"
      />

      <div className="w-full px-3 py-4 lg:px-20 lg:py-12 min-h-screen flex flex-col justify-between">
        {/* content  */}

        {/* <RegistrationForm /> */}

        <div className="h-full flex flex-col items-center lg:justify-between gap-6 lg:gap-10">
          <p className="text-[25px] lg:text-[65px] font-display text-primary text-center mt-10 lg:mt-0">
            {uiTexts[lang ?? 'EN'].speakersRegistration}
          </p>

          <div id="speakers-registration-form" className="bg-primary/4 border-primary/40 border py-10 lg:py-20 backdrop-blur-3xl w-full lg:w-[1200px] xl:w-[1400px] flex justify-center">
            {step === 0 && <LangChoser />}
            {step === 1 && <FormOne />}
            {step === 2 && <FormTwo />}
            {step === 3 && <FormThree />}
          </div>
        </div>

        <div className="w-full flex justify-between lg:justify-between items-end mt-16">
          <TimeLocationTag />
          <Logos color="black" />
        </div>
      </div>
    </div>
  );
}
