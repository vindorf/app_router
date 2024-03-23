"use client";

import { useFormStatus } from "react-dom";

type Props = {
    label: string;
}

export default function SubmitBtn({label}: Props) {
    const {pending } = useFormStatus();

    return(
        <button
        type='submit'
        disabled={pending}
        className="text-white w-full h-8 m-auto bg-zinc-200 hover:bg-zinc-300 mb-4 rounded disabled:opacity-20 focus:outline-none border border-white"
        >{label}</button>
    )
}