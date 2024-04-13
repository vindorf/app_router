"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useSession } from "next-auth/react";


const CartPage = () => {
  const {data:session} = useSession();
  const uMail = session?.user?.email;
  const [msg, setMsg] = useState("");
    const {cart, removeFromCart, addToCart, clearCart, fetch} = useCartStore((state) => ({
    fetch: state.fetch,
    cart: state.cart,
    removeFromCart: state.removeFromCart,
    addToCart: state.addToCart,
    clearCart: state.clearCart
  }))

  const handleDelete = async (ID:string) => {
    await removeFromCart(uMail, ID);
    setMsg("Removed from cart");
    await fetch(uMail)
  };



  useEffect(() => {
  if(session) {
    fetch(uMail);
  }
  
},[]);


// console.log('MAIL', uMail)
// console.log('CART', cart)

  return (
    <div className="mt-5 ml-64 mr-16">
      <div className="text-white  inset-0 flex flex-col justify-start items-center">
        <div className="mt-40 mb-8 w-full bg-zinc-900 opacity-80 px-4 rounded flex flex-col">
          <b className="text-[50px]">Your Cart User </b>
          <div className="flex items-center justify-end mb-2">
          <Link className="bg-zinc-900 hover:underline" href="/products">
            Back
          </Link>        
          </div>       
        </div>
        <div className="h-[30px] text-zinc-500">
        {msg && <p>{msg} </p>}
        </div>
      </div>
      <p>Cart Items {cart && cart.length} </p>
      {cart && cart.map((e:any, i:any) => 
      <div key={i} className="border p-2">
      <p>{e._id} </p>
      <button onClick={() => handleDelete(e._id)}>Delete</button>
      </div>
      )}
    </div>
  );
};

export default CartPage;
