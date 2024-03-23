"use client";
import React from "react";
import { MdOutlineKeyboardReturn } from "react-icons/md";
import useSWR from "swr";

type Props = {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export default function UserDetails({ params }: { params: { id: string } }) {
  const fetcher = (url: string | URL | Request) =>
    fetch(url).then((res) => res.json());

  const { data, error, isLoading, isValidating } = useSWR(
    `https://jsonplaceholder.typicode.com/users/${params.id}`,
    fetcher
  );

  if (error) return <div className="text-center mt-24">failed to load</div>;
  if (isLoading || !data || isValidating)
    return <div className="text-center mt-24">Wait please...</div>;

  const api = !Array.isArray(data) ? [data] : data;
  
  return (
    <div className="flex mt-24 justify-center">
      {api &&
        api.map((e: any) => (
          <div key={e.id} className="grid grid-cols-2  gap-2 ml-44 text-xs border-r p-2 w-[400px] h-full">
            <p className="whitespace-nowrap font-extralight underline">{e.company.catchPhrase} </p>
            <p></p>
            <p>Id:</p>
            <p>{e.id} </p>
            <p>Name:</p>
            <p>{e.name} </p>
            <p>Username:</p>
            <p>{e.username} </p>
            <p>Email:</p>
            <p>{e.email} </p>
            <p>Phone:</p>
            <p>{e.phone} </p>
            <p>Website:</p>
            <p>{e.website} </p>
            <p>Company:</p>
            <p>{e.company.name} </p>
            <p className="font-extralight underline">Address</p>
            <p></p>
            <p>Street:</p>
            <p>{e.address.street} </p>
            <p>Suite:</p>
            <p>{e.address.suite} </p>
            <p>City:</p>
            <p>{e.address.city} </p>
            <p>Zipcode:</p>
            <p>{e.address.zipcode} </p>
          </div>
        ))}
      <a
        className="flex justify-center h-1em items-center bg-zinc-200  mx-3 hover:text-zinc-700 shadow hover:shadow-xl px-1 rounded"
        href="/user"
      >
        <MdOutlineKeyboardReturn />
      </a>
    </div>
  );
}
