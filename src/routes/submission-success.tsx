import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { Logos } from '@/components/ui/logos';

const pointsOfSale = [
  "Université des sciences et de la technologie Houari-Boumédiène",
  "École Nationale Supérieure Agronomique",
  "Ecole Polytechnique d'architecture et urbanisme",
  "Ecole Nationale Supérieure en Statistique et en Économie Appliquée - Kolea",
  "Ecole superieure des Systèmes Autonomes - Sidi Abdellah",
  "Ecole Supérieure de l'Informatique",
  "La Faculté de Médecine – UNIVERSITÉ ALGER 1"
]

export const Route = createFileRoute('/submission-success')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();

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
        className="h-full w-full px-4 py-8 lg:px-20 flex flex-col justify-center items-center gap-8 overflow-y-scroll"
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
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <h1 className="text-[48px] lg:text-[72px] font-display text-primary">
            SUBMISSION SUCCESS!
          </h1>
          <p className="text-[18px] lg:text-[24px] text-primary/80 max-w-2xl">
            Your registration has been submitted successfully. Please visit one of our stands below to complete your purchase.
          </p>
        </motion.div>

        {/* Points of Sale Table */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="w-full max-w-4xl mt-6"
        >
          <div className="bg-primary/5 backdrop-blur-xl border-2 border-primary/40 rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-primary/10 border-b border-primary/40">
              <h2 className="text-[24px] lg:text-[32px] font-display text-primary text-center">
                Our Points of Sale
              </h2>
            </div>
            <div className="p-4 lg:p-6">
              <div className="space-y-3">
                {pointsOfSale.map((point, index) => (
                  <motion.div
                    key={point}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                    className="px-4 py-3 bg-primary/3 border border-primary/20 rounded hover:bg-primary/8 hover:border-primary/40 transition-all duration-300"
                  >
                    <p className="text-[14px] lg:text-[16px] text-primary">
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>


        {/* Action Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="mt-6"
        >
          <button
            onClick={() => navigate({ to: '/' })}
            className="px-8 py-3 text-[16px] lg:text-[18px] font-bold border-primary border uppercase hover:scale-105 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out text-primary"
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
