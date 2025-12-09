import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { api } from '../../../convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import { Stopwatch } from '@/components/Stopwatch'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')

  const handlePasswordSubmit = (e: any) => {
    e.preventDefault()
    if (password === 'vive ignite') {
      setIsAuthenticated(true)
      setAuthError('')
    } else {
      setAuthError('Incorrect password')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Authentication Required</h1>

          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="Enter password"
                required
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white font-bold rounded-lg shadow hover:bg-primary/90 transition-colors"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    )
  }

  return <AdminDashboard />
}

function AdminDashboard() {
  const scoreboard = useQuery(api.speakers.getScoreboard)
  const updateSpeakerStatus = useMutation(api.speakers.updateSpeakerStatus)
  const updateVotingStatus = useMutation(api.speakers.updateVotingStatus)

  if (!scoreboard) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Speaker Management</h1>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Speaker
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Status & Metrics
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {scoreboard.map(({ speaker, score, votesCount }) => (
                  <tr key={speaker._id} className="hover:bg-gray-50 transition-colors">
                    {/* Column 1: Speaker Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200 shrink-0">
                          <img
                            src={`/speakers/${speaker._id}.png`}
                            alt={speaker.info.map(i => i.fullName).join(' & ')}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="font-semibold text-gray-800">
                          {speaker.info.map(i => i.fullName).join(' & ')}
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Status & Metrics */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500 font-medium">Speaker:</span>
                          <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-bold uppercase",
                            speaker.status === 'SPEAKED' && "bg-green-100 text-green-700",
                            speaker.status === 'SPEAKING' && "bg-blue-100 text-blue-700",
                            speaker.status === 'SPEAKNT' && "bg-gray-100 text-gray-700"
                          )}>
                            {speaker.status === 'SPEAKNT' ? 'Not Yet' : speaker.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500 font-medium">Voting:</span>
                          <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-bold uppercase",
                            speaker.votingStatus === 'ON' && "bg-green-100 text-green-700",
                            speaker.votingStatus === 'SOON' && "bg-yellow-100 text-yellow-700",
                            speaker.votingStatus === 'OFF' && "bg-red-100 text-red-700"
                          )}>
                            {speaker.votingStatus}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div>
                            <span className="text-gray-500 font-medium">Votes:</span>
                            <span className="ml-2 font-semibold text-gray-800">{votesCount}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 font-medium">Score:</span>
                            <span className="ml-2 font-semibold text-gray-800">{score.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Column 3: Actions */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-3">
                        {/* Speaker Status Controls */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateSpeakerStatus({ speakerId: speaker._id, status: 'SPEAKNT' })}
                            className={cn(
                              "px-3 py-1.5 text-xs font-bold rounded-lg transition-all",
                              speaker.status === 'SPEAKNT'
                                ? "bg-gray-700 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            )}
                          >
                            NOT YET
                          </button>
                          <button
                            onClick={() => updateSpeakerStatus({ speakerId: speaker._id, status: 'SPEAKING' })}
                            className={cn(
                              "px-3 py-1.5 text-xs font-bold rounded-lg transition-all",
                              speaker.status === 'SPEAKING'
                                ? "bg-blue-600 text-white"
                                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                            )}
                          >
                            SPEAKING
                          </button>
                          <button
                            onClick={() => updateSpeakerStatus({ speakerId: speaker._id, status: 'SPEAKED' })}
                            className={cn(
                              "px-3 py-1.5 text-xs font-bold rounded-lg transition-all",
                              speaker.status === 'SPEAKED'
                                ? "bg-green-600 text-white"
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                            )}
                          >
                            SPEAKED
                          </button>
                        </div>

                        {/* Voting Status Controls */}
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateVotingStatus({ speakerId: speaker._id, votingStatus: 'OFF' })}
                              className={cn(
                                "px-3 py-1.5 text-xs font-bold rounded-lg transition-all",
                                speaker.votingStatus === 'OFF'
                                  ? "bg-red-600 text-white"
                                  : "bg-red-100 text-red-700 hover:bg-red-200"
                              )}
                            >
                              OFF
                            </button>
                            <button
                              onClick={() => updateVotingStatus({ speakerId: speaker._id, votingStatus: 'SOON' })}
                              className={cn(
                                "px-3 py-1.5 text-xs font-bold rounded-lg transition-all",
                                speaker.votingStatus === 'SOON'
                                  ? "bg-yellow-600 text-white"
                                  : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                              )}
                            >
                              SOON
                            </button>
                            <button
                              onClick={() => updateVotingStatus({ speakerId: speaker._id, votingStatus: 'ON' })}
                              className={cn(
                                "px-3 py-1.5 text-xs font-bold rounded-lg transition-all",
                                speaker.votingStatus === 'ON'
                                  ? "bg-green-600 text-white"
                                  : "bg-green-100 text-green-700 hover:bg-green-200"
                              )}
                            >
                              ON
                            </button>
                          </div>

                          {/* Stopwatch */}
                          <div className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-lg",
                            speaker.votingStatus === 'ON' ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"
                          )}>
                            <span className="text-xs text-gray-600 font-medium">Timer:</span>
                            <Stopwatch isRunning={speaker.votingStatus === 'ON'} />
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
