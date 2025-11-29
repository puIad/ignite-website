import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { Logos } from '@/components/ui/logos';

export const Route = createFileRoute('/payment-success')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { tr?: string } => ({ tr: String(search?.tr) ?? "" }),
})

function RouteComponent() {
  const navigate = useNavigate();
  const { tr } = Route.useSearch();

  return (
    <div className="h-dvh relative flex flex-col justify-between items-center w-screen overflow-y-scroll">
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
        className="h-full w-full px-4 py-8 lg:px-20 flex flex-col justify-center items-center gap-8"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary"
          />
          <div className="w-32 h-32 rounded-full bg-primary/10 backdrop-blur-xl border-2 border-primary flex items-center justify-center">
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="w-16 h-16 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path d="M20 6L9 17l-5-5" />
            </motion.svg>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center space-y-4"
        >
          <h1 className="text-[48px] lg:text-[72px] font-display text-primary">
            PAYMENT SUCCESS!
          </h1>
          <p className="text-[18px] lg:text-[24px] text-primary/80 max-w-2xl">
            Your payment has been processed successfully. You'll receive your ticket via email shortly.
          </p>
          {tr && (
            <p className="text-[14px] lg:text-[16px] text-primary/60 font-mono">
              Transaction ID: {tr}
            </p>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col lg:flex-row gap-4 mt-6"
        >
          <button
            onClick={() => navigate({ to: '/' })}
            className="px-8 py-3 text-[16px] lg:text-[18px] font-bold border-primary border uppercase hover:scale-105 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out"
          >
            Return Home
          </button>
        </motion.div>
      </motion.div>

      <div className="mb-10">
        <Logos color="black" />
      </div>
    </div>
  )
}
