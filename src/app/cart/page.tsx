"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toCap } from "../utils/cap";
import CartCart from "../components/CartCart";
import { MdOutlineKeyboardReturn } from "react-icons/md";

const CartPage = () => {
  const { data: session } = useSession();
  const uMail = session?.user?.email;
  const uName = session?.user?.name;
  const [msg, setMsg] = useState("");
  const { fetch, cart, removeFromCart } = useCartStore((state) => ({
    fetch: state.fetch,
    cart: state.cart,
    removeFromCart: state.removeFromCart,
  }));

  if (!session) {
    redirect("/login");
  }

  const handleDelete = async (ID: string, title: string) => {
    await removeFromCart(uMail, ID);
    setMsg(`${title} removed successfully`);
    setTimeout(() => {
      setMsg("");
    }, 2000);
    await fetch(uMail);
  };

  useEffect(() => {
    if (uMail) {
      fetch(uMail);
    }
  }, []);

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price;
  }
  console.log("TOTAL", total);
  console.log("CART", cart);

  return (
    <div className="mt-5 ml-64 mr-16 mb-24">
      <div className="text-white  inset-0 flex flex-col justify-start items-center">
        <div className="mt-40 mb-8 w-full bg-zinc-900 opacity-80 px-4 rounded flex flex-col">
          <b className="text-[50px]">{toCap(`${uName}`)}'s Cart</b>
          <div className="flex items-center justify-end mb-2">
            <Link className="bg-zinc-900 hover:underline" href="/products">
              <div className="flex items-center justify-center gap-2">
                <MdOutlineKeyboardReturn />
                Products
              </div>
            </Link>
          </div>
        </div>
        <div className="h-[30px] text-zinc-500">{msg && <p>{msg} </p>}</div>
      </div>
      <b className="w-full block text-center font-mono">
        Cart Items {cart && cart.length}{" "}
      </b>
      <div className="border rounded mt-4 p-3 shadow-lg">
        {cart &&
          cart.map((e: any, i: any) => (
            <CartCart
              key={i}
              _id={e._id}
              title={e.title}
              image={e.image}
              price={e.price}
              remove={() => {
                handleDelete(e._id, e.title);
              }}
            />
          ))}
        <div className="flex items-center justify-between px-2 font-mono text-[20px] border-y">
          <b>Total:</b>
          <b>{total} €</b>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
