import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        pfp: v.string(),
        email: v.string(),
    }) .index("by_email", ["email"]),

    conversations: defineTable({
        authorId: v.string(),
        text: v.string(),
        recipientId: v.string()

    })
})