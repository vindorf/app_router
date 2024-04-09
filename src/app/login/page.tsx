"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import CustomInput from "../components/CustomInput";
import CustomBtn from "../components/CustomBtn";
import Container from "../components/Container";

const Account = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [input, setInput] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session]);

  const login = async () => {
    if (!input.email || !input.password) {
      setMsg("Input required");
      setTimeout(() => {
        setMsg("");
      }, 2000);
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: input.email,
        password: input.password,
      });

      if (res?.status == 200) {
        router.push("/");
      } else if(res?.status == 401) {
        setMsg("Invalid credentials");
      }
      return;
    } catch (error) {
      console.log("Error login", error);
    }
  };

  const handleInputChange = (e: any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  return (
    <div className="ml-44">
      <Container 
      className='text-white'
      label="Login">
        <div>
          <div className="flex flex-col w-56 p-3 gap-3">
            <CustomInput
              type="text"
              placeholder="Email"
              name="email"
              value={input.email}
              func={handleInputChange}
            />
            <CustomInput
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              func={handleInputChange}
            />
            <CustomBtn 
            className='border-t'
            label="Login" func={login} />
          </div>
          {msg && (
            <p className="text-zinc-500 font-extralight text-xs text-center"> {msg} </p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Account;
