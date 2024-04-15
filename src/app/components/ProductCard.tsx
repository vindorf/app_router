"use client";
import React, { useState } from "react";
import { MdOutlineDetails } from "react-icons/md";
import { useCartStore } from "../store/cartStore";
import { useSession } from "next-auth/react";

type CardProps = {
  _id: string;
  title: string;
  image: string;
  price: number;
};
export const ProductCard = ({ _id, title, image, price }: CardProps) => {
  const { data: session } = useSession();
  const uMail = session?.user?.email;
  const [msg, setMsg] = useState("");
  const addToCart = useCartStore((state) => state.addToCart);
  const status = useCartStore((state) => state.status);
  

  const handlerAdd = async (title: string) => {
    await addToCart(uMail, { _id })
    setMsg(`${title} done`);
    setTimeout(() => {
      setMsg("");
    }, 2000);
  };

  return (
    <div className="p-2 justify-center items-center h-[370px] shadow hover:shadow-lg rounded">
      <div className=" flex flex-col rounded items-start bg-zinc-100 px-2 mb-1">
        <b className="text-zinc-500 text-[20px] font-mono">{title} </b>
      </div>
      <div className="w-56  flex flex-col justify-end items-center">
        <a className="bg-white rounded" href={`/products/${_id}`}>
          <div className="h-[240px] w-56 rounded border-y pt-2 pb-2">
            <img className="w-full rounded" src={`${image}`} />
          </div>
        </a>
        <div className="h-5 w-full text-center font-mono mb-2">
          {msg && <b> {msg}</b>}
        </div>
        <div className="w-full text-center">
          <b>{price} €</b>
        </div>
        <div className="my-2 py-1 pr-2 border-t w-full flex justify-center items-center">
          <button
            className="font-light text-xs mx-2 hover:underline w-full"
            onClick={() => handlerAdd(title)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
