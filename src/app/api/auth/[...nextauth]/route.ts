import { fetchMutation } from "convex/nextjs";
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { api } from "../../../../../convex/_generated/api";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more providers here
  ],


  callbacks: {
    async signIn({ user }: { user: { name?: string | null; image?: string | null; email?: string | null } }){
      try {
        await fetchMutation(api.auth.insertUser, {
          name: user.name ?? "",
          pfp: user.image ?? "",
          email: user.email ?? "",
        })
      } catch (err) {
        console.error(err)
      }
      return true
    },
  },
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}