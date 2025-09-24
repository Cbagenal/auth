import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const insertUser = mutation({
    args: {
        name: v.string(),
        pfp: v.string(),
        email: v.string(),
    },

    handler: async (ctx, args) => {

        const userFound = await ctx.db
        .query("users")
        .withIndex("by_email", q => q.eq("email", args.email))
        .unique()

        if(userFound){
            return;
        }
        ctx.db.insert("users", args)
    }
})

export const queryUser = query({
    handler: (ctx) => {
       return ctx.db.query("users").collect()
    }
})

export const insertData = mutation({
    args: {
        authorId: v.string(),
        text: v.string(),
        recipientId: v.string(),
    },

    handler: (ctx, args) => {
        ctx.db.insert("conversations", args)
    }
})

export const queryData = query({
    handler: (ctx) => {
        return ctx.db.query("conversations").collect()
    }
})