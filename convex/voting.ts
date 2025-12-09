import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const vote = mutation({
  args: {
    speakerId: v.id('speakers'),
    rating: v.number(),
    visitorId: v.optional(v.string())
  },
  handler: async (ctx, { speakerId, rating, visitorId }) => {
    const prevVote = await ctx.db.query('votes').filter(q =>
      q.and(
        q.eq(q.field('speakerId'), speakerId),
        q.eq(q.field('visitorId'), visitorId)
      )
    ).first()
    if (prevVote) {
      ctx.db.patch(prevVote._id, { rating })
    } else {
      await ctx.db.insert('votes', { speakerId, rating })
    }
  }
})

export const getVote = query({
  args: {
    speakerId: v.string(),
    visitorId: v.string()
  },
  handler: async (ctx, { speakerId, visitorId }) => {
    return await ctx.db.query('votes').filter(q =>
      q.and(
        q.eq(q.field('speakerId'), speakerId),
        q.eq(q.field('visitorId'), visitorId)
      )
    ).first()
  }
})

