"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RegisterError = ({ params }: { params: { error: string } }) => {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    switch (params.error) {
      case "error_1":
        setMsg("Please fill in all fields");
        break;
      case "error_2":
        setMsg("Password must be at least 8 characters");
        break;
      case "error_3":
        setMsg("Enter valid email format");
        break;
      case "error_4":
        setMsg("User already exist");
        break;
      default:
        setMsg("An unknown error occurred.");
        break;
    }
  }, [params.error]);
  return (
    <div className="flex flex-col items-center mt-24 ml-16 text-white">
      <div className="bg-zinc-900 opacity-80 text-white text-[50px] w-3/4 p-3 rounded m-5">
        <b>Register error</b>
      </div>

      <ul className="flex flex-col gap-3 my-5">
        <li className="border-b pb-4">please check this ...</li>
        {msg && <b>{msg}</b>}
        <li className="border-b pb-4">Happy Happy ...</li>
      </ul>
      <Link
        className="shadow-lg px-3 w-3/4 text-center opacity-80 text-white bg-zinc-800 rounded hover:bg-zinc-700"
        href="/register"
      >
        Try again
      </Link>
    </div>
  );
};

export default RegisterError;
