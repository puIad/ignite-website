import { useNavigate } from "@tanstack/react-router";
import { formStore } from "./schema";

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
  const setStep = formStore((state) => state.setStep);
  const partOne = formStore((s) => s.partOne);
  const lang = formStore((state) => state.lang);
  const api_endpoint = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const transaction_uuid = crypto.getRandomValues(new Uint8Array(6))
    .reduce((s, b) => s + b.toString(16).padStart(2, '0'), '');

  async function handleBuyOnline() {
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
    }
  }
  return (
    <div className="h-full flex flex-col items-center justify-center gap-8 px-4 lg:px-11">
      <div className="flex flex-col gap-6 text-primary py-4">
        <button onClick={handleBuyOnline}
          className="px-6 py-2.5 text-[14px] lg:text-[18px] font-bold border-primary border uppercase hover:scale-101 hover:bg-primary/3 transition-all duration-300 ease-in-out">
          Buy online with your card
        </button>
        <button onClick={handleBuyOnline}
          className="px-6 py-2.5 text-[14px] lg:text-[18px] font-bold border-primary border uppercase hover:scale-101 hover:bg-primary/3 transition-all duration-300 ease-in-out">
          Buy from one of our stands
        </button>
      </div>
      <div className="w-full max-w-[350px] h-px bg-primary" />
      <div className="w-full max-w-[600px] overflow-x-auto px-4">
        <table className="w-full min-w-[300px]">
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
