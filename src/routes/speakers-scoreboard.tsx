import { createFileRoute } from '@tanstack/react-router'
import { api } from '../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { motion } from 'motion/react'

export const Route = createFileRoute('/speakers-scoreboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const scoreboard = useQuery(api.speakers.getScoreboard)

  if (!scoreboard) return <div className="flex items-center justify-center min-h-screen w-screen bg-black text-white">Loading...</div>

  return (
    <div className="flex flex-col items-center min-h-screen w-screen bg-black text-white p-4 pb-20">
      <h1 className="text-3xl font-bold mb-8 mt-4">Speakers Scoreboard</h1>
      <div className="w-full max-w-3xl flex flex-col gap-4">
        {scoreboard.map(({ id, speaker, score }, index) => (
          <motion.div
            key={speaker?._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 bg-zinc-900 p-4 rounded-xl border border-zinc-800"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800 text-xl font-bold text-zinc-400">
              #{index + 1}
            </div>

            <div className="w-16 h-16 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0">
              {speaker?.info.map(s =>
                <img src={s.imgUrl} alt={s.fullName} className="w-full h-full object-cover" />
              )}
            </div>

            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{speaker?.info.map(i => i.fullName).join(' & ')}</h3>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-blue-500">{score}</div>
              {/* <div className="text-xs text-zinc-500">{votesCount} votes</div> */}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
