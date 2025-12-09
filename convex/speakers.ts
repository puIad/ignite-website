import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const updateSpeakerStatus = mutation({
  args: {
    speakerId: v.id('speakers'),
    status: v.union(v.literal('SPEAKNT'), v.literal('SPEAKING'), v.literal('SPEAKED'))
  },
  handler: async (ctx, { speakerId, status }) => {
    await ctx.db.patch(speakerId, { status })
  }
})

export const updateVotingStatus = mutation({
  args: {
    speakerId: v.id('speakers'),
    votingStatus: v.union(v.literal('OFF'), v.literal('SOON'), v.literal('ON'))
  },
  handler: async (ctx, { speakerId, votingStatus }) => {
    if (votingStatus === "ON") {
      await ctx.db.patch(speakerId, { votingStatus, votingStartTime: String(Date.now()) })
    } else {
      await ctx.db.patch(speakerId, { votingStatus })
    }
  }
})

export const getScoreboard = query({
  handler: async (ctx) => {
    const votings = await ctx.db.query('votes').collect()
    const speakers = await ctx.db.query('speakers').collect()
    const visitors = await ctx.db.query('visitors').collect()

    const visitorVipMap = new Map<string, boolean>();
    visitors.forEach(v => {
      if (v.isVip) {
        visitorVipMap.set(v._id, true);
      }
    });

    const speakerStats = new Map<string, { score: number, count: number }>()

    votings.forEach(vote => {
      const isVip = visitorVipMap.get(vote.visitorId);
      const multiplier = isVip ? 5 : 1;
      
      const prev = speakerStats.get(vote.speakerId)
      speakerStats.set(vote.speakerId,
        {
          score: (prev?.score ?? 0) + (vote.rating * multiplier),
          count: (prev?.count ?? 0) + multiplier
        }
      )
    })

    let scoreboard = speakers.map(speaker => {
      const stats = speakerStats.get(speaker._id)
      const score = (stats?.score ?? 0) / (stats?.count ?? 1)
      return {
        id: speaker._id,
        speaker,
        score: score,
        votesCount: stats?.count ?? 0
      }
    })

    scoreboard = scoreboard.sort((a, b) => b.score - a.score)
    return scoreboard
  }
})


export const getSpeakers = query({
  handler: async (ctx) => {
    return await ctx.db.query('speakers').collect()
  }
})

