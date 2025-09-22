import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const insertData = mutation({
    args: {
        text: v.string(),
    },

    handler: (ctx, args) => {
        ctx.db.insert("content", args)
    }
})