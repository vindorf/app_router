"use client"
import { signOut } from "next-auth/react";

export default function LogoutBtn () {
    return (
        <button
        className="m-5 pr-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-b w-full"
        onClick={() => signOut()}
        >Logout</button>
    ) 
}
