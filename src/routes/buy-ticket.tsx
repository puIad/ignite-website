import { createFileRoute } from '@tanstack/react-router'
import { formStore } from '@/components/form/schema';
import { Logos } from '@/components/ui/logos';
import { useRouter } from '@tanstack/react-router'
import { AnimatePresence, motion } from "motion/react"
import { BuyTicketFormOne } from '@/components/form/buy-ticket-form-1';
import { BuyTicketFormTwo } from '@/components/form/buy-ticket-form-2';

export const Route = createFileRoute('/buy-ticket')({
  component: RouteComponent,
})


export function RouteComponent() {
  const router = useRouter()

  const lang = formStore((state) => state.lang);
  const step = formStore((state) => state.step);
  const setStep = formStore((state) => state.setStep);

  if (!lang) router.navigate({ to: '/' })
  if (!lang) setStep(0);

  return (
    <div
      style={{ overflowY: "scroll" }}
      className="allow-scroll h-dvh relative flex flex-col justify-between lg:justify-center w-screen overflow-y-scroll" id={"speakers-registration"}>
      <motion.img
        src="/images/noisy-red-mobile.png"
        className="absolute lg:hidden h-full object-cover top-0 left-0 -z-10"
      />
      <motion.img
        src="/images/noisy-red-desktop.png"
        className="absolute hidden h-full object-cover top-0 left-0 lg:inline -z-10"
      />

      <motion.div
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0, duration: 1, ease: "easeOut" }}
        className="h-full w-full px-4 py-0 lg:px-20 lg:py-8 flex flex-col justify-start overflow-x-clip overflow-y-scroll">

        <div className="h-full w-full flex flex-col items-center lg:justify-center gap-6 lg:gap-3">
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
                className="h-[70dvh] bg-primary/4 border-primary/40 border px-10 lg:px-60 py-10 lg:py-10 backdrop-blur-3xl w-full transition-all duration-300 ease-out flex justify-center overflow-y-scroll"
              >
                {step === 1 && <BuyTicketFormOne />}
                {step === 2 && <BuyTicketFormTwo />}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="mb-10 mt-5" >
        <Logos color="black" />
      </div>
      {/* <div className="w-full flex justify-between lg:justify-between items-end pb-6 px-3 lg:px-20"> */}
      {/*   <TimeLocationTag /> */}
      {/* </div> */}
    </div>
  );
}
