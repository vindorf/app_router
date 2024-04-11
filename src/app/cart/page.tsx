"use client"
import Link from "next/link";
import React from "react";
import { useCartStore } from "../store/cartStore";


const CartPage = () => {
  const {cart, removeFromCart, addToCart, clearCart} = useCartStore((state) => ({
    cart: state.cart,
    removeFromCart: state.removeFromCart,
    addToCart: state.addToCart,
    clearCart: state.clearCart
  }))
  return (
    <div className="mt-5 ml-64 mr-16">
      <div className="text-white  inset-0 flex flex-col justify-start items-center">
        <div className="mt-40 mb-8 w-full bg-zinc-900 opacity-80 px-4 rounded flex flex-col">
          <b className="text-[50px]">Your Cart User </b>
          <div className="flex items-center justify-between mb-2">
          <button 
          className="hover:underline"
          onClick={() => clearCart()}>Clear</button>
          <Link className="bg-zinc-900 hover:underline" href="/products">
            Back
          </Link>
         
          </div>
         
        </div>
      </div>
      <p>Cart Items {cart.length} </p>
      {cart && cart.map((e:any) => 
      <div className="border p-2">
      <p>{e.id} </p>
      <button 
      className="hover:underline"
      onClick={() => {removeFromCart(e.id)}}>Remove</button>
      </div>
      )}
    </div>
  );
};

export default CartPage;
