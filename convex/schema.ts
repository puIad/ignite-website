import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  speakers: defineTable({
    info: v.array(v.object({
      fullName: v.string(),
      imgUrl: v.string(),
    })),
    status: v.union(v.literal('SPEAKNT'), v.literal('SPEAKING'), v.literal('SPEAKED')),
    votingStatus: v.optional(v.union(v.literal('OFF'), v.literal('SOON'), v.literal('ON'))),
    votingStartTime: v.optional(v.string()),
    order: v.number()
  }),
  votes: defineTable({
    speakerId: v.id('speakers'),
    visitorId: v.optional(v.id('visitors')),
    rating: v.number()
  }).index('by_speakerId', ['speakerId']),

  visitors: defineTable({
    magicToken: v.string(),
    email: v.optional(v.string()),
    barcode: v.string(),
    guestMode: v.boolean(),
    isVip: v.optional(v.boolean()),
    checkedIn: v.boolean()
  }).index('by_barcode', ['barcode'])
})

export default schema;
