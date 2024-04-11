"use client";
import React, { useState } from "react";
import { MdOutlineDetails } from "react-icons/md";
import { useCartStore } from "../store/cartStore";

type CardProps = {
  id: string;
  title: string;
  image: string;
};
export const ProductCard = ({ id, title, image }: CardProps) => {
  const [msg, setMsg] = useState("");
  const { cart, removeFromCart, addToCart, clearCart } = useCartStore(
    (state) => ({
      cart: state.cart,
      removeFromCart: state.removeFromCart,
      addToCart: state.addToCart,
      clearCart: state.clearCart,
    })
  );

  const handlerAdd = () => {
    addToCart({id});
    setMsg("Added to cart");
  }

  return (
    <div className="p-2 justify-center items-center h-[320px] shadow hover:shadow-lg rounded">
      <div className=" flex flex-col items-start">
        <h1 className="text-zinc-500">{title} </h1>
      </div>
      <div className="w-56  flex flex-col justify-end items-center">
        <a 
        className="bg-white"
        href={`/products/${id}`}>
          <div className="h-[235px] w-56">
            <img className="w-full" src={`${image}`} />
          </div>
        </a>
        <div className="h-5">
        {msg && <b> {msg}</b>}
        </div>
        
        <div className="my-2 w-full flex justify-end items-center">
          <button
            className="font-light text-xs mx-2"
            onClick={handlerAdd}
          >
            Add to cart
          </button>
          <a 
          className="bg-white"
          href={`/products/${id}`}>
            <MdOutlineDetails className="h-full" />
          </a>
        </div>
      </div>
    </div>
  );
};
