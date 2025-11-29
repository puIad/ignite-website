import { useNavigate } from "@tanstack/react-router";
import { formStore } from "./schema";
import { useState } from "react";

const pointsOfSale = [
  "Université des sciences et de la technologie Houari-Boumédiène",
  "École Nationale Supérieure Agronomique",
  "Ecole Polytechnique d’architecture et urbanisme",
  "Ecole Nationale Supérieure en Statistique et en Économie Appliquée - Kolea",
  "Ecole superieure des Systèmes Autonomes - Sidi Abdellah",
  "Ecole Supérieure de l’Informatique",
  "La Faculté de Médecine – UNIVERSITÉ ALGER 1"
]

export function BuyTicketFormTwo() {
  const [isLoadingOnline, setIsLoadingOnline] = useState(false);
  const [isLoadingStand, setIsLoadingStand] = useState(false);
  const setStep = formStore((state) => state.setStep);
  const partOne = formStore((s) => s.partOne);
  const lang = formStore((state) => state.lang);
  const api_endpoint = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const transaction_uuid = crypto.getRandomValues(new Uint8Array(6))
    .reduce((s, b) => s + b.toString(16).padStart(2, '0'), '');

  async function handleBuyOnline() {
    setIsLoadingOnline(true);
    try {
      const res = await fetch(`${api_endpoint}/handle-buy-submit`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          transactionId: transaction_uuid,
          isPaymentOnline: true,
          userInfo: {
            firstName: partOne.email,
            lastName: partOne.last_name,
            email: partOne.email,
            phoneNumber: partOne.phone
          },
          triggerQueue: true,
          formData: JSON.stringify(partOne)
        })
      })
      if (res.ok) {
        const data = await res.json() as { url: string }
        const url = data.url.replace(/\s+/g, '');
        navigate({ href: url })
      } else {
        console.log(await res.text())
        navigate({ to: '/payment-fail' })
      }
    } catch (error) {
      navigate({ to: '/payment-fail' })
    } finally {
      setIsLoadingOnline(false);
    }
  }

  async function handleBuyAtStand() {
    setIsLoadingStand(true);
    try {
      const res = await fetch(`${api_endpoint}/handle-buy-submit`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          transactionId: transaction_uuid,
          isPaymentOnline: false,
          userInfo: {
            firstName: partOne.email,
            lastName: partOne.last_name,
            email: partOne.email,
            phoneNumber: partOne.phone
          },
          triggerQueue: false,
          formData: JSON.stringify(partOne)
        })
      })
      if (res.ok) {
        navigate({ to: '/submission-success' })
      } else {
        navigate({ to: '/payment-fail' })
      }
    } catch (error) {
      navigate({ to: '/payment-fail' })
    } finally {
      setIsLoadingStand(false);
    }
  }

  const Spinner = () => (
    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <div className="h-full flex flex-col items-center justify-center gap-8 px-4 lg:px-11">
      <div className="flex flex-col gap-6 text-primary py-4">
        <button
          onClick={handleBuyOnline}
          disabled={isLoadingOnline || isLoadingStand}
          className={`px-6 py-2.5 text-[14px] lg:text-[18px] font-bold border-primary border uppercase hover:scale-101 hover:bg-primary/3 transition-all duration-300 ease-in-out flex items-center justify-center gap-3 ${(isLoadingOnline || isLoadingStand) ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {isLoadingOnline && <Spinner />}
          Buy online with your card
        </button>
        <button
          onClick={handleBuyAtStand}
          disabled={isLoadingOnline || isLoadingStand}
          className={`px-6 py-2.5 text-[14px] lg:text-[18px] font-bold border-primary border uppercase hover:scale-101 hover:bg-primary/3 transition-all duration-300 ease-in-out flex items-center justify-center gap-3 ${(isLoadingOnline || isLoadingStand) ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {isLoadingStand && <Spinner />}
          Buy from one of our stands
        </button>
      </div>
      <div className="w-full max-w-[350px] h-px bg-primary" />
      <div className="w-full max-w-[600px] lg:max-w-[700px] overflow-x-auto px-4">
        <table className="w-full min-w-[300px] lg:min-w-[600px]">
          <thead><tr><th className="border border-black/40 text-[20px] text-primary font-display px-3 py-3 bg-white/8">Our Points of Sales</th></tr></thead>
          <tbody>
            {pointsOfSale.map(p => <tr key={p}><td
              className="border border-black/40 text-[16px] px-4 py-2 bg-white/1"
            >{p}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )


  // await fetch(`${api_endpoint}/post-payment`, {
  //   method: "POST",
  //   headers: {
  //     'Content-Type': "application/json"
  //   },
  //   body: JSON.stringify({ productId: 'TEST_TAG_001' })
  // }).then(async res => console.log(await res.json()))
}
