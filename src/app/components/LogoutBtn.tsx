"use client"
import { signOut } from "next-auth/react";

export default function LogoutBtn () {
    return (
        <button
        className="bg-zinc-100 mx-2 hover:text-zinc-700 shadow hover:shadow-xl px-2 rounded"
        onClick={() => signOut()}
        >Logout</button>
    ) 
}
