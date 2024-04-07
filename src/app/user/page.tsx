"use client";
import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUserApi } from "../../../hooks/useUserApi";

const TOP_OFFSET = 400;
const BOTTOM_OFFSET = 800;

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
  address: {
    street: string;
    suite: string;
    zipcode: string;
  };
}

const UserPage = () => {
  const [showD, setShowD] = useState(false);
  const [byId, setById] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data, error, isLoading, isValidating } = useUserApi();

  if (status === "unauthenticated") {
    router.replace("/login");
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowD(true);
      } else {
        setShowD(false);
      }

      if (window.scrollY >= BOTTOM_OFFSET) {
        setShowD(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (error) return <div className="text-center mt-24">failed to load</div>;
  if (isLoading || !data || isValidating)
    return <div className="text-center mt-24">Wait please...</div>;

  const api = !Array.isArray(data) ? [data] : data;

  const userById = async (e: any) => {
    e.preventDefault();
    try {
      const serachUser = await fetch(
        `https://jsonplaceholder.typicode.com/users/${byId}`
      ).then((res) => res.json());
      if (!serachUser.id) {
        setMsg("User not found...");
        setUser(null);
      } else {
        setUser(serachUser);
        setMsg("");
      }
      setById("");
      return;
    } catch (error: any) {
      throw new Error("Error fetching by Id", error);
    }
  };
  return (
    <div className={`flex flex-col items-center mt-24 mb-24 ml-24 text-white`}>
      <h1 className="text-xl mb-5">User Page</h1>
      <div className="flex flex-col justify-center items-center my-5">
        <h1 className="">Search by ID</h1>
        <form onSubmit={userById}>
          <input
            placeholder="   Id"
            type="text"
            name="Id"
            value={byId}
            onChange={(e) => setById(e.target.value)}
            className=" rounded-l focus:outline-none focus:border"
          />
          <button className="rounded-r bg-zinc-200 hover:bg-zinc-300 text-zinc-600 px-3">
            Search
          </button>
        </form>
        {msg ? (
          <div className="text-xs my-3 animate-bounce">{msg} </div>
        ) : (
          user && (
            <div className="bg-zinc-200 px-2 mt-8 w-[410px]">
              <div
                className="bg-zinc-100 rounded grid grid-cols-2 grid-rows-2 gap-2 p-2 shadow-lg my-4"
                key={user?.id}
              >
                <p>Name:</p>
                <h1> {user?.name} </h1>
                <p>Id:</p>
                <p> {user?.id} </p>
              </div>
            </div>
          )
        )}
      </div>
      <div
        className={`
      fixed top-[400px]
      bg-red-400 
      w-4/5 
      text-center
       ${!showD ? "hidden" : ""}
      `}
      >
        <h1 className="text-xl">Welcome to 400 to 800</h1>
      </div>
      <h1 className="my-6 text-xl">All User</h1>
      {api &&
        api.map((e: any) => (
          <UserCard
            key={e.id}
            id={e.id}
            name={e.name}
            email={e.email}
            company={e.company.name}
          />
        ))}
    </div>
  );
};

export default UserPage;
