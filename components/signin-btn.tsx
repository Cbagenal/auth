'use client'
import { signIn } from "next-auth/react"

export default function Login(){
    return <button className="bg-blue-500 p-2 rounded-md" onClick={() => signIn('google')}>Sign In</button>
}