import Link from "next/link";
import React from "react";

const RegisterError = () => {
  return (
    <div className="flex flex-col items-center mt-24 ml-16">
      <div className="bg-zinc-600 text-white text-[50px] w-3/4 p-3 rounded m-5">
        <b>Register error</b>
      </div>

      <ul className="flex flex-col gap-3 my-5">
        <li className="border-b pb-4">please check this things</li>
        <li>1. input required</li>
        <li>2. valid email format</li>
        <li className="border-b pb-4">3. password at least 8 characters</li>
      </ul>
      <Link 
      className="shadow-lg px-3 w-3/4 text-center text-white bg-zinc-500 rounded hover:bg-zinc-300"
      href="/register">Try again</Link>
    </div>
  );
};

export default RegisterError;
