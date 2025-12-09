import { createFileRoute } from '@tanstack/react-router'
import { api } from "../../convex/_generated/api"
import { useMutation, useQuery } from 'convex/react';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Id } from '../../convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { countDown } from '@/components/Stopwatch';

export const Route = createFileRoute('/vote')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [visitorId, setVisitorId] = useState<null | string>(null)
  const authenticate = useMutation(api.visitors.authenticate)

  const speakers = useQuery(api.speakers.getSpeakers)
  const vote = useMutation(api.voting.vote)

  const [selectedSpeaker, setSelectedSpeaker] = useState<{ id: Id<"speakers">, name: string } | null>(null)

  useEffect(() => {
    async function foo() {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const { visitorId } = await authenticate({ token })
          if (visitorId) {
            setVisitorId(visitorId)
            setIsAuthenticated(true)
          }
        } catch (e) { }
      }
    }
    foo()
  }, [])

  if (!speakers) {
    return <p>loading</p>
  }

  if (!isAuthenticated || !visitorId)
    return (
      <div
        className='flex relative flex-col items-center min-h-screen w-screen bg-[#731D37] text-black p-4 pb-20'
        style={{
          backgroundImage: 'url(/images/blended-image.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto'
        }}
      >
        <div className='w-full h-20 flex justify-between z-20 px-2 py-3'>
          <img src="/logos/vic-white.svg" className='h-8' />
          <img src="/logos/ignite-white.svg" className='h-8.5' />
        </div>
        <div className='flex-1 flex justify-center items-center'>
          <p className="text-white text-[25px] uppercase italic text-center">There is a problem, please contact a member of the organization team to fix it.</p>
        </div>
      </div>
    )


  return (
    <div
      className='flex relative flex-col items-center min-h-screen w-screen bg-[#731D37] text-black p-4 pb-20'
      style={{
        backgroundImage: 'url(/images/blended-image.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto'
      }}
    >
      <div className='w-full h-20 flex justify-between z-20 px-2 py-3'>
        <img src="/logos/vic-white.svg" className='h-8' />
        <img src="/logos/ignite-white.svg" className='h-8.5' />
      </div>

      <div className='z-20 flex-col justify-center items-center '>
        <h1 className="text-[25px] uppercase text-center font-bold mb-8 mt-4 font-display text-white">Rate The Speakers</h1>
        <div className="flex flex-col md:grid-cols-3 lg:grid-cols-4 items-center justify-center gap-8 w-full max-w-4xl">
          {speakers.map((speaker) => (
            <>
              <div className='w-[90%] h-px bg-white' />
              <motion.div
                key={speaker._id}
                layoutId={`speaker-${speaker._id}`}
                onClick={() => {
                  if (speaker.status === "SPEAKED" && speaker.votingStatus === "ON")
                    setSelectedSpeaker({ id: speaker._id, name: speaker.info.map(i => i.fullName).join(' & ') })
                }}
                whileTap={{ scale: 0.95 }}
                className={cn(`relative w-[80%] flex flex-col items-center cursor-pointer transition-colors border border-white`,
                  speaker.status === "SPEAKNT" && ""
                )}
              >
                <SpeakerAction startTime={speaker.votingStartTime} visitorId={visitorId} speakerId={speaker._id} speakerStatus={speaker.status} votingStatus={speaker.votingStatus ?? "OFF"} />
                <div className={cn('w-full bg-white/4 aspect-[0.67]',
                  speaker.status === "SPEAKNT" && "opacity-80"
                )}>
                  <img src={`/speakers/${speaker._id}.png`} alt={speaker.info[0].fullName} className="w-full object-cover" />
                  {/* <img src={'/images/avatar.png'} alt={speaker.info[0].fullName} className="w-full object-cover" /> */}
                </div>

                <div className="w-full text-center border-t border-white py-3">
                  <p className="font-bold text-[20px] leading-[1.2] px-2 text-white ">
                    {speaker.info.map(i => i.fullName).join(' & ')}
                  </p>
                </div>
              </motion.div>
            </>
          ))}
        </div>

        <AnimatePresence>
          {selectedSpeaker && (
            <VotePopup
              speakerId={selectedSpeaker.id}
              speakerName={selectedSpeaker.name}
              onClose={() => setSelectedSpeaker(null)}
              onVote={async (rating) => {
                await vote({ speakerId: selectedSpeaker.id, rating, visitorId: (visitorId ?? "") as Id<'visitors'> })
                setSelectedSpeaker(null)
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function VotePopup({ speakerName, onClose, onVote }: { speakerId: Id<"speakers">, speakerName: string, onClose: () => void, onVote: (rating: number) => Promise<void> }) {
  const [integerPart, setIntegerPart] = useState(5)
  const [decimalPart, setDecimalPart] = useState(5)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const integerRef = useRef<HTMLInputElement>(null)
  const decimalRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const rating = integerPart + (decimalPart / 10)

  const handleIntegerChange = (e: any) => {
    const val = parseInt(e.key)
    if (val) {
      setIntegerPart(val)
    }
    decimalRef.current?.focus()
  }

  const handleDecimalChange = (e: any) => {
    const val = parseInt(e.key) || 0
    setDecimalPart(val)
    buttonRef.current?.focus()
  }

  const handleConfirm = async () => {
    setIsSubmitting(true)
    try {
      await onVote(rating)
    } catch (e) {
      console.error("Failed to vote", e)
      setIsSubmitting(false)
    }
  }
  useEffect(() => {
    integerRef.current?.focus()
  }, [])

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6 pb-10 border-t border-gray-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-2" />

          <div className="text-center">
            <h2 className="text-xl text-gray-600">Voting for</h2>
            <h3 className="text-2xl font-bold text-black">{speakerName}</h3>
          </div>

          <div className="flex items-center justify-center gap-3 my-4">
            <input
              type="number"
              min="0"
              max="9"
              maxLength={1}
              defaultValue={5}
              value={integerPart}
              onKeyDown={handleIntegerChange}
              className="w-20 h-20 text-center text-4xl font-bold bg-gray-100 text-black rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
              ref={integerRef}
            />
            <div className="text-5xl font-bold text-black">.</div>
            <input
              type="number"
              min="0"
              max="9"
              maxLength={1}
              defaultValue={5}
              value={decimalPart}
              onKeyDown={handleDecimalChange}
              className="w-20 h-20 text-center text-4xl font-bold bg-gray-100 text-black rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
              ref={decimalRef}
            />
          </div>

          <div className="text-center mb-4">
            <div className="text-sm text-gray-600">Current Rating</div>
            <div className="text-4xl font-bold text-black">{rating.toFixed(1)}</div>
          </div>

          <motion.button
            className="w-full py-4 uppercase rounded-xl text-xl font-bold font-display transition-all bg-primary text-white shadow-red-900/20 shadow-xl cursor-pointer disabled:opacity-50"
            disabled={isSubmitting}
            onClick={handleConfirm}
            whileTap={{ scale: 0.98 }}
            ref={buttonRef}
          >
            {isSubmitting ? "Rating..." : "Rate Speaker"}
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}

function SpeakerAction({ startTime, visitorId, speakerId, speakerStatus, votingStatus }: { startTime: string | undefined, speakerId: string, visitorId: string, speakerStatus: string, votingStatus: string }) {
  const prevVote = useQuery(api.voting.getVote, { visitorId, speakerId })
  const prevRating = prevVote?.rating ?? null
  if (!startTime) startTime = String(Date.now())
  const countDownValue = countDown({ startTime, timeoutValue: 60 * 5 })
  if (speakerStatus === "SPEAKNT") {
    return <div className={cn("absolute w-full h-full flex justify-center items-center z-50 bg-black/70",)}>
      <p className='bg-black/60 border-black border-2 text-white px-5 py-2 text-[20px] font-semibold text-center'>
        BACK STAGE
      </p>
    </div>
  } else if (speakerStatus === "SPEAKING") {
    return <div className={cn("absolute w-full h-full flex justify-center items-center z-50 bg-yellow-600/30")}>
      <p className='bg-yellow-500/80 border-yellow-500 border-2 text-white px-5 py-2 text-[20px] font-semibold text-center'>
        CURRENTLY ON STAGE
      </p>
    </div>
  } else if (votingStatus === "SOON") {
    return <div className={cn("absolute w-full h-full flex justify-center items-center z-50 bg-yellow-600/30")}>
      <div className='flex flex-col justify-center gap-1'>
        <p className='bg-yellow-500/80 border-yellow-500 border-2 text-white px-5 py-2 text-[20px] font-semibold text-center'>
          RATING STARTS SOON
        </p>
        <span className='font-medium text-[14px] italic text-white uppercase text-center mt-2'>The speaker has just finished his speech</span>
      </div>
    </div>
  } else if (votingStatus === "ON") {
    return <div className={cn("absolute w-full h-full flex justify-center items-center z-50 bg-[#1C5206]/50",
    )}>
      {prevRating
        ? <p className='text-white px-5 py-2 rounded-sm text-[20px] font-semibold text-center'>
          RATED {prevRating}
          <br />
          <span className='font-medium text-[18px] italic text-red-500 uppercase text-center mt-2'>RATING ENDS IN {countDownValue}</span>
        </p>
        : <p className='text-white px-5 py-2 rounded-sm text-[20px] font-semibold text-center'>
          TAP TO RATE NOW!
          <br />
          <span className='font-medium text-[18px] italic text-red-500 uppercase text-center mt-2'>RATING ENDS IN {countDownValue}</span>
          <br />
        </p>
      }
    </div>
  }

  return <div className={cn("absolute w-full h-full flex justify-center items-center z-50", prevRating ? "bg-[#1C5206]/50" : "bg-primary/60")}>
    {prevRating
      ? <div className='flex flex-col justify-center gap-1'>
        <p className='bg-[#1C5206]/80 border-[#1C5206] border text-white px-5 py-2 text-[20px] font-semibold text-center'>
          RATED {prevRating}
          <br />
        </p>
        <span className='font-medium text-[14px] italic text-white/80 uppercase text-center mt-2'>RATING IS OVER</span>
      </div>

      : <div className='flex flex-col justify-center gap-1'>
        <p className='bg-primary/80 border-primary border text-white px-5 py-2 text-[20px] font-semibold text-center'>
          VOTING IS OVER
          <br />
        </p>
        <span className='font-medium text-[14px] italic text-white/80 uppercase text-center mt-2'>Speaker finished speaking</span>
      </div>
    }
  </div>
}
